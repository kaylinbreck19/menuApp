class MenuItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    describe() {
        return `${this.name} - $${this.price.toFixed(2)}`;
    }
}

class MenuCategory {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addItem(item) {
        if (item instanceof MenuItem) {
            this.items.push(item);
        } else {
            throw new Error(`You can only add an instance of MenuItem. Argument is not an item: ${item}`);
        }
    }

    describe() {
        return `${this.name} category has ${this.items.length} items.`;
    }
}

class RestaurantMenu {
    constructor() {
        this.categories = [];
        this.selectedCategory = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection !== '0') {
            switch (selection) {
                case '1':
                    this.createCategory();
                    break;
                case '2':
                    this.viewCategory();
                    break;
                case '3':
                    this.deleteCategory();
                    break;
                case '4':
                    this.displayCategories();
                    break;
                default:
                    selection = '0';
                    break;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Thank you for using our Restaurant Menu!');
    }

    showMainMenuOptions() {
        return prompt(`
0) Exit
1) Create a item
2) View an item
3) Delete an item
4) Display all menu items
`);
    }

    showCategoryMenuOptions(categoryInfo) {
        return prompt(`
0) Back
1) Add a new item to the category
2) Display category details
-----------------
${categoryInfo}
`);
    }

    createCategory() {
        let name = prompt('Enter name for new category:');
        this.categories.push(new MenuCategory(name));
    }

    viewCategory() {
        let index = prompt('Enter the index of the category that you want to view:');
        if (index >= 0 && index < this.categories.length) {
            this.selectedCategory = this.categories[index];
            let description = 'Category Details:\n';
            description += this.selectedCategory.describe();
            let selection1 = this.showCategoryMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.addItemToCategory();
                    break;
            }
        }
    }

    deleteCategory() {
        let index = prompt('Enter the index of the category that you wish to delete:');
        if (index >= 0 && index < this.categories.length) {
            this.categories.splice(index, 1);
            alert('Category deleted successfully.');
        }
    }

    addItemToCategory() {
        let name = prompt('Enter the name of the item:');
        let price = parseFloat(prompt('Enter the price of the item:'));
        this.selectedCategory.addItem(new MenuItem(name, price));
        alert('Item added to the category.');
    }
}

let restaurantMenu = new RestaurantMenu();
restaurantMenu.start();
