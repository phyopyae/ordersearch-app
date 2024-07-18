import React from "react";

const OrderDetail = (selectedDetail) => {

    const detail = selectedDetail.detail;
    const order = selectedDetail.order;

    const warnMsgs = [
        { id: 1, msg: "To trade this security in this account, a currency conversion will be made at the current rate." },
        { id: 1, msg: "A similar order has already been submitted." },
        { id: 1, msg: "Your transaction will be processed the following business day." },
        { id: 1, msg: "It is not possible to calculate the buying power of this order." },
        { id: 1, msg: "A cancellation will not be possible during business hours on market orders. You can call a representative for more information." },
        { id: 1, msg: "For the above-mentioned reason(s), your order will be processed by one of our representatives." }
    ]

    const formatPrice = (price) => {
        return price.toFixed(2);
    };

    return (
        <div>
            <div className="detail">
                <div className="detail-header">
                    <h5 className="name">{detail.firstName} {detail.lastName} ( {detail.marginAccount} ) </h5>
                    <div className="detail-header-button">
                        <button className="review-detail-btn">Full review details</button>
                        <button className="reject-detail-btn">Reject</button>
                        <button className="accept-detail-btn">Accept</button>
                    </div>
                </div>

                <div className="detail-body">
                    <table className="table-detail-body">
                        <tr>
                            <td>Net Amount : {detail.netAmount} {detail.currency}</td>
                            <td colSpan={2}></td>
                            <td>Price : {formatPrice(order.price)}</td>
                            <td colSpan={2}></td>
                            <td>Exchange Rate : {detail.exchangeRate}</td>
                            <td colSpan={2}></td>
                            <td>O/S Limit : {detail.osLimit}</td>
                        </tr>
                        <tr>
                            <td>Reference Number : {order.refNo}</td>
                            <td colSpan={2}></td>
                            <td>Date / Time : {order.date}</td>
                            <td colSpan={2}></td>
                            <td>Telephone : {detail.phoneNumber}</td>
                            <td colSpan={2}></td>
                            <td>User ID : {detail.userId}</td>
                        </tr>
                    </table>
                </div>
                <div className="detail-footer">
                    <h4>Warning(s)</h4>
                    <ul>
                        {warnMsgs.map(warn => (
                            <React.Fragment key={warn.id}>
                                <li>{warn.msg}</li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>

        </div>

    );
}

export default OrderDetail;