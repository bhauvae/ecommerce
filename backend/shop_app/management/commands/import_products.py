import csv
import os
from django.core.management.base import BaseCommand
from django.core.files import File
from shop_app.models import Product
from PIL import Image, ImageDraw, ImageFont
import random


class Command(BaseCommand):
    help = "Import products from CSV file and generate placeholder images if missing"

    def handle(self, *args, **options):
        # Get the CSV file path
        csv_file = "data/products.csv"
        os.makedirs("media/img", exist_ok=True)

        if not os.path.exists(csv_file):
            self.stdout.write(self.style.ERROR(f"CSV file {csv_file} does not exist."))
            return

        # Clear all existing products before importing
        Product.objects.all().delete()
        self.stdout.write(self.style.WARNING("All existing products deleted."))

        # Open the CSV file
        with open(csv_file, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                name = row["name"]
                description = row.get("description", "")
                price = row["price"]
                category = row.get("category", "")
                image_filename = row.get("image_filename", "")

                # Create a new Product instance
                product = Product(
                    name=name,
                    description=description,
                    price=price,
                    category=category,
                )

                # Handle image attachment
                if image_filename:
                    image_path = os.path.join("media/img", image_filename)

                    if not os.path.exists(image_path):
                        # Generate a placeholder image if it doesn't exist
                        self.generate_placeholder_image(name, image_filename)

                    # Save the image if it exists now
                    with open(image_path, "rb") as img_file:
                        product.image.save(image_filename, File(img_file), save=False)

                # Save the product
                product.save()

                os.remove(os.path.join("media/img", image_filename))

                # Remove the image after saving the product

            self.stdout.write(self.style.SUCCESS("Products imported successfully!"))

    def generate_placeholder_image(self, product_name, image_filename):
        # Set image size
        image_size = (500, 200)

        # Create a blank image with a random background color
        img = Image.new(
            "RGB",
            image_size,
            color=(
                random.randint(100, 255),
                random.randint(100, 255),
                random.randint(100, 255),
            ),
        )
        d = ImageDraw.Draw(img)

        # Set the font size (you can adjust this as needed)
        font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20
        )

        # Define max width for text before wrapping
        max_width = image_size[0] - 20  # 20 pixels padding

        # Split the text into words and wrap it to fit within the max width
        lines = self.wrap_text(product_name, font, max_width)

        # Start drawing the text from the top
        y_position = 130  # Start drawing text at this Y coordinate

        # Draw each line of text on the image
        for line in lines:
            d.text((10, y_position), line, font=font, fill=(0, 0, 0))
            y_position += 20  # Move the Y position down for the next line

        # Save the image to the media/img folder
        img_path = os.path.join("media/img", image_filename)
        img.save(img_path)
        self.stdout.write(
            self.style.SUCCESS(
                f"Generated placeholder image for {product_name} at {img_path}"
            )
        )

    def wrap_text(self, text, font, max_width):
        """
        Wraps text to fit within a given max width. Breaks lines based on word boundaries.
        """
        words = text.split()
        lines = []
        current_line = ""

        for word in words:
            # Check the width of the current line with the new word
            test_line = current_line + " " + word if current_line else word
            width, _ = self.get_text_width(test_line, font)

            # If the line is too wide, add the current line to the list and start a new line
            if width <= max_width:
                current_line = test_line
            else:
                if current_line:
                    lines.append(current_line)
                current_line = word

        # Add the last line
        if current_line:
            lines.append(current_line)

        return lines

    def get_text_width(self, text, font):
        """
        Returns the width of the text using the specified font.
        """
        # Use textbbox (bounding box) instead of textsize
        bbox = ImageDraw.Draw(Image.new("RGB", (1, 1))).textbbox(
            (0, 0), text, font=font
        )
        width = (
            bbox[2] - bbox[0]
        )  # bbox[2] is the x2 coordinate (right side), bbox[0] is the x1 coordinate (left side)
        return width, 0  # We return width and height, but height is not used here
