import InvoiceBody from "../../component/invoice/InvoiceBody";
import Header from "../../component/fixed/Header";
import Footer from "../../component/fixed/Footer";
function InvoicePage() {
    return ( 
        <div className="InvoicePage">
            <Header/>
            <InvoiceBody />
            <Footer/>
        </div>
     );
}

export default InvoicePage;