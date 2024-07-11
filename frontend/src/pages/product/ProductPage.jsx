import Header from '../../component/fixed/Header'
import Footer from '../../component/fixed/Footer'
import ProductBody from '../../component/product/ProductBody'

export default function ProductPage(){
    return(
        <div className="ProductPage" style={{ width: '1490px' ,animation: "fadeInUp 0.6s ease"}}>
            <Header/>
            <ProductBody/>
            <Footer/>
        </div>
    )
}