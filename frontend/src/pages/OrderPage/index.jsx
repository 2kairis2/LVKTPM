import Header from '../../component/fixed/Header'
import Footer from '../../component/fixed/Footer'
import OrderBody from '../../component/order/OrderBody'
export default function OrderPage(){
    return(
        <div className="OrderPage"style={{animation: "fadeInUp 0.6s ease"}}>
            <Header/>
            <OrderBody />
            <Footer/>
        </div>
    )
}