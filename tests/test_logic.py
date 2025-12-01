from logic import add_numbers, capitalize_text

def test_add_numbers():
    assert add_numbers(2, 3) == 5

def test_capitalize_text():
    assert capitalize_text("hello") == "Hello"
