import pandas as pd

# Generate 200 products
num_products = 200
categories = ["Electronics", "Groceries", "Clothing", "Furniture", "Home Appliances"]
products = []

for i in range(1, num_products + 1):
    code = f"Product-{i:03d}"
    category = categories[(i - 1) % len(categories)]
    description = (
        f"{code} is a premium offering in the {category} category, engineered with the highest quality materials "
        "and cutting-edge technology to ensure unparalleled performance. It boasts a refined design, "
        "meticulously crafted to meet rigorous industry standards and exceed customer expectations. "
        "Whether for professional use or everyday enjoyment, this product delivers consistency, durability, "
        "and exceptional value over its lifetime."
    )
    image_filename = f"product_{i:03d}.png"
    products.append(
        {
            "name": code,
            "description": description,
            "price": round(10 + (i * 5.37) % 1990, 2),  # varied price
            "category": category,
            "image_filename": image_filename,
        }
    )

df = pd.DataFrame(products)

# Save to CSV
file_path = "/mnt/d/ecommerce/backend/data/products.csv"
df.to_csv(file_path, index=False)

