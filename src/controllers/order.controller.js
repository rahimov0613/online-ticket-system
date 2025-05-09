import { Order } from '../models/index.js';

export const orderController = {
  async create(req, res, next) {
    try {
      const body = req.body;

      if (!body.user) {
        throw new Error('User detail not complited!.');
      }
      const newOrder = new Order(req.body);

      await newOrder.save();

      return res.status(201).json({
        message: 'Created',
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    try {
      const data = await Order.find()
        .populate('user', { email: 1 })
        .populate('ticket');
      return res.status(200).json({
        message: 'All orders',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id)
      if (!order) {
        throw new Error('Order not found');
      }
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      if (!order) {
        throw new Error('Order not found');
      }
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        throw new Error('Order not found');
      }
      return res.status(200).json({
        message: 'Deleted',
      });
    } catch (error) {
      next(error);
    }
  },
};