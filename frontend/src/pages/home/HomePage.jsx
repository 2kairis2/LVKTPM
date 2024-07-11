import Header from "../../component/fixed/Header"
import Slide from "../../component/home/Slide"
import Introduction from "../../component/home/Introduction"
import Product from "../../component/home/Product"
import Article from "../../component/home/Article"
import Footer from "../../component/fixed/Footer"
import "./HomePage.css"
export default function HomePage(){
    return(
        <div className="HomePage">
            <Header/>
            <Slide/>
            <Introduction/>
            <Product/>
            <Article/>
            <Footer/>
        </div>
    )
}