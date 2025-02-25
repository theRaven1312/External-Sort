import random

# Tạo danh sách 100 số ngẫu nhiên từ 1 đến 1000
random_numbers = [random.randint(1, 100) for _ in range(1000)]

# Ghi danh sách số vào file txt
with open("input.txt", "w") as file:
    for number in random_numbers:
        file.write(f"{number}\n")
