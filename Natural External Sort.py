import os

# Hàm ghi dữ liệu vào file
def write_to_file(filename, data):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write('\n'.join(map(str, data)))

# Hàm đọc dữ liệu từ file
def read_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return list(map(int, file.read().splitlines()))

# Hàm chia dữ liệu thành các runs và sắp xếp từng run
def create_sorted_runs(input_file, run_size):
    runs = []
    with open(input_file, 'r', encoding='utf-8') as file:
        while True:
            data = []
            for _ in range(run_size):
                line = file.readline()
                if not line:
                    break
                data.append(int(line.strip()))
            if not data:
                break
            data.sort()
            run_file = f'run_{len(runs)}.txt'
            write_to_file(run_file, data)
            runs.append(run_file)
    return runs

# Hàm trộn hai runs đã sắp xếp
def merge_two_runs(run1, run2, output_file):
    data1 = read_from_file(run1)
    data2 = read_from_file(run2)
    merged = []
    i = j = 0
    while i < len(data1) and j < len(data2):
        if data1[i] < data2[j]:
            merged.append(data1[i])
            i += 1
        else:
            merged.append(data2[j])
            j += 1
    while i < len(data1):
        merged.append(data1[i])
        i += 1
    while j < len(data2):
        merged.append(data2[j])
        j += 1
    write_to_file(output_file, merged)

# Hàm trộn tất cả các runs
def merge_all_runs(run_files, output_file):
    while len(run_files) > 1:
        new_runs = []
        for i in range(0, len(run_files), 2):
            if i + 1 < len(run_files):
                merged_file = f'merged_{len(new_runs)}.txt'
                merge_two_runs(run_files[i], run_files[i + 1], merged_file)
                new_runs.append(merged_file)
            else:
                new_runs.append(run_files[i])
        run_files = new_runs
    os.rename(run_files[0], output_file)

# Hàm sắp xếp ngoại
def external_sort(input_file, output_file, run_size):
    run_files = create_sorted_runs(input_file, run_size)
    merge_all_runs(run_files, output_file)

# Test thuật toán
input_file = 'input.txt'
output_file = 'sorted_output.txt'
run_size = 4  # Số lượng phần tử tối đa trong mỗi run

# Thực hiện sắp xếp
external_sort(input_file, output_file, run_size)

# In kết quả
print("Dữ liệu đã sắp xếp lưu tại", output_file)
