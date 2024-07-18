import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import OrderDetail from "./OrderDetail";
import { fetchOrders } from "../api/fetchOrders";
import { fetchDetails } from "../api/fetchDetails";

const OrderView = () => {
    const todayDate = new Date();
    const startOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
    const endOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);

    const periodOpts = [
        { value: 1, label: 'Transmission' }
    ];

    const statusOpts = [
        { value: 1, label: 'Waiting' }
    ];

    const [openOrderId, setOpenedOrderId] = useState(null);
    const [fromDate, setFromDate] = useState(startOfMonth);
    const [toDate, setToDate] = useState(endOfMonth);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderCount, setOrderCount] = useState(filteredOrders.length);
    const [period, setPeriod] = useState(1);
    const [status, setStatus] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const ordersData = await fetchOrders();
                setFilteredOrders(ordersData);
                setOrderCount(ordersData.length);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, []);

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                const orderDetailData = await fetchDetails();
                setOrderDetails(orderDetailData);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetailData();
    }, []);

    const fetchOrderData = async () => {
        try {
            const ordersData = await fetchOrders();
            const filtered = ordersData.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= fromDate && orderDate <= toDate && order.period === period && order.status === status;
            });

            setFilteredOrders(filtered);
            setOrderCount(filtered.length);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
            setIsSearch(false);
        }
    };

    useEffect(() => {
        if (isSearch) {
            fetchOrderData();
        }
    }, [fromDate, toDate]);

    if (loading) {
        return <div className="loading">Loading ....</div>;
    }

    const changePeriod = (e) => {
        setPeriod(e.target.value);
    }

    const changeStatus = (e) => {
        setStatus(e.target.value);
    }

    const search = (e) => {
        e.preventDefault();
        setIsSearch(true);
        fetchOrderData();
    }

    const openDetails = (orderId) => {
        setOpenedOrderId(openOrderId === orderId ? null : orderId);
    };

    const formatPrice = (price) => {
        if (price != null) {
            return price.toFixed(2);
        }
        return price;
    };

    const openDetail = orderDetails.find(detail => detail.orderId === openOrderId) || null;

    return (
        <div>
            <div className="navbar">
                <div className="nav-item search-section">
                    <div className="search-label">
                        <span className="title">Search</span>
                    </div>
                    <div className="search-results">
                        <span>Search results : {orderCount}</span>
                    </div>
                </div>
                <div className="nav-item">
                    <span className="label-header">Period</span>
                    <div className="dropdown">
                        <select id="periodDropdown" value={period} onChange={changePeriod}>
                            {periodOpts.map((period) => (
                                <option key={period.value} value={period.value}>
                                    {period.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="nav-item">
                    <span className="label-header">Status</span>
                    <div className="dropdown">
                        <select id="statusDropdown" value={status} onChange={changeStatus}>
                            {statusOpts.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="nav-item">
                    <span className="label-header">From</span>
                    <DatePicker selected={fromDate}
                        onChange={date => setFromDate(date)}
                        dateFormat="dd/MM/yyyy"
                        enableTabLoop={false} />
                </div>
                <div className="nav-item">
                    <span className="label-header">To</span>
                    <DatePicker selected={toDate}
                        onChange={date => setToDate(date)}
                        dateFormat="dd/MM/yyyy"
                        enableTabLoop={false} />
                </div>
                <div className="search-btn">
                    <form onSubmit={search} className="form-inline">
                        <button className="btn btn-primary" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div className="table">
                <table className="table-orders table">
                    <thead>
                        <tr className="orderRow">
                            <th></th>
                            <th>Account</th>
                            <th>Operation</th>
                            <th>Symbol</th>
                            <th>Description</th>
                            <th>Qty.</th>
                            <th>Filled Qty</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Expiration</th>
                            <th>No. Ref.</th>
                            <th>Ext. Ref.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <React.Fragment key={order.id}>
                                <tr className="orderRow" onClick={() => openDetails(order.id)}>
                                    <td>
                                        <button className="arrow">
                                            {openOrderId === order.id ? 'v' : '>'}
                                        </button>
                                    </td>
                                    <td className="account-col">{order.account}</td>
                                    <td>{order.operation}</td>
                                    <td>{order.symbol}</td>
                                    <td>{order.description}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.filledQuantity}</td>
                                    <td>{formatPrice(order.price)}</td>
                                    <td>{order.status}</td>
                                    <td>{order.date}</td>
                                    <td>{order.expireDate}</td>
                                    <td>{order.refNo}</td>
                                    <td>{order.redExt}</td>
                                    <td></td>
                                </tr>
                                {openOrderId === order.id && (
                                    <tr className="detailRow">
                                        <td colSpan="14">
                                            <OrderDetail detail={openDetail} order={filteredOrders.find(order => order.id === openOrderId) || null} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderView;