numbers = []

while True:
    new_num = int(input("Enter a number: "))
    numbers.append(new_num)

    check = input("Enter 'y' to add more numbers, or any other key to stop: ")
    if check.lower() != 'y':
        break

for i in numbers:
    product = numbers[i] * numbers[(i + 1)]
    print(product)
