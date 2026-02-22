import * as  orderService from "../services/order.service.js";

export const getOrders = async (req, res) => {
    try{
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({ message: error.message });
    };
};

export const createOrder = async (req, res) => {
    try{
        const orderData = req.body;
        const newOrder = await orderService.addOrder(orderData);
        res.status(201).json(newOrder);
    }catch(error){
        res.status(500).json({ message: error.message });
    };
};

export const completeOrder = async (req, res) => {
    try{
        const order = await orderService.markOrderAsPaid(req.params.id, req.body);
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({ message: error.message });
    };
};