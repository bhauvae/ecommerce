import csv
import os
import random
from django.core.management.base import BaseCommand
from django.core.files.storage import default_storage
from django.core.files import File
from django.conf import settings
from shop_app.models import Product
from PIL import Image, ImageDraw, ImageFont


class Command(BaseCommand):
    help = "Import products from a CSV file and generate placeholder images if missing."

    def handle(self, *args, **options):
        csv_file_path = "data/products.csv"
        media_img_path = os.path.join(settings.MEDIA_ROOT, "img")
        os.makedirs(media_img_path, exist_ok=True)

        if not os.path.exists(csv_file_path):
            self.stdout.write(
                self.style.ERROR(f"CSV file {csv_file_path} does not exist.")
            )
            return

        # Clear existing products
        Product.objects.all().delete()
        self.stdout.write(self.style.WARNING("All existing products deleted."))


        with open(csv_file_path, newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                name = row.get("name", "").strip()
                description = row.get("description", "").strip()
                price = row.get("price", "").strip()
                category = row.get("category", "").strip()
                image_filename = row.get("image_filename", "").strip()

                product = Product(
                    name=name,
                    description=description,
                    price=price,
                    category=category,
                )

                if image_filename:
                    image_path = os.path.join(media_img_path, image_filename)

                    if not os.path.exists(image_path):
                        self.generate_placeholder_image(name, image_path)

                    if os.path.exists(image_path):
                        with open(image_path, "rb") as img_file:
                            # Before saving
                            if default_storage.exists(f"img/{image_filename}"):
                                default_storage.delete(f"img/{image_filename}")

                            product.image.save(
                                image_filename, File(img_file), save=False
                            )

                product.save()


        self.stdout.write(self.style.SUCCESS("Products imported successfully!"))

    def generate_placeholder_image(self, product_name, image_path):
        image_size = (600, 200)
        background_color = (
            random.randint(100, 255),
            random.randint(100, 255),
            random.randint(100, 255),
        )

        img = Image.new("RGB", image_size, color=background_color)
        draw = ImageDraw.Draw(img)

        try:
            font = ImageFont.truetype(
                "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20
            )
        except IOError:
            font = ImageFont.load_default()

        max_width = image_size[0] - 20
        lines = self.wrap_text(product_name, font, max_width, draw)

        # Calculate total text height
        line_heights = []
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font)
            line_height = bbox[3] - bbox[1]
            line_heights.append(line_height)
        total_text_height = sum(line_heights)

        y_position = (image_size[1] - total_text_height) // 2

        for line, line_height in zip(lines, line_heights):
            bbox = draw.textbbox((0, 0), line, font=font)
            
            x_position = 100
            draw.text((x_position, y_position), line, font=font, fill=(0, 0, 0))
            y_position += line_height

        img.save(image_path)
        self.stdout.write(
            self.style.SUCCESS(f"Generated placeholder image at {image_path}")
        )

    def wrap_text(self, text, font, max_width, draw):
        words = text.split()
        lines = []
        current_line = ""

        for word in words:
            test_line = f"{current_line} {word}".strip()
            bbox = draw.textbbox((0, 0), test_line, font=font)
            line_width = bbox[2] - bbox[0]

            if line_width <= max_width:
                current_line = test_line
            else:
                if current_line:
                    lines.append(current_line)
                current_line = word

        if current_line:
            lines.append(current_line)

        return lines
