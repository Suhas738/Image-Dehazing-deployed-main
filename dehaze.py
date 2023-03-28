from demo import run_dehaze

test_root = 'Samples/'

test_levels = ['Thin_haze/', 'Moderate_haze/', 'Thick_haze/']

for x in test_levels:
    test_folder_path = test_root + x
    print(test_folder_path)
    run_dehaze(test_folder_path)