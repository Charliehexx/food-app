
import { Menu } from '../models/menu-model.js';
import { Restaurant } from '../models/restaurant-model.js';
import uploadImageOnCloudinary from '../utils/imageUpload.js';


export const addMenu = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(404).json({ success: false, message: "Image is required" })
        }
        const imageURL = await uploadImageOnCloudinary(file)
        const menu = await Menu.create({ name, description, price, image: imageURL })
        const restaurant = await Restaurant.findOne({ user: req.id })
        if (restaurant) {
            (restaurant.menus).push(menu._id);
            await restaurant.save();

        }
        return res.status(201).json({
            success: true,
            message: "Menu added successfully",
            menu
        })


    }
    catch (err) {
        return res.status(500).json({ message: "" })
    }
}

export const editMenu = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({ success: false, message: "menu not found" })
        }
        if (name) {
            menu.name = name;

        }
        if (description) { menu.description = description }
        if (price) {
            menu.price = price
        }
        if (file) {
            const imageURL = await uploadImageOnCloudinary(file)
            menu.image = imageURL
        }
        await menu.save()
        return res.status(200).json({ success: true, message: 'menu updated', menu })
    }

    catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
}