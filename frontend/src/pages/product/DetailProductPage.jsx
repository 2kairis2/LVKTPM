import Header from "../../component/fixed/Header";
import DetailProductBody from "../../component/product-detail/DetailProductBody";
import Footer from "../../component/fixed/Footer";
import { useEffect } from "react";

export default function DetailProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="DetailProductPage" style={{"max-width": "100%", animation: "fadeInUp 0.6s ease"}}>
      <Header />
      <DetailProductBody />
      <Footer />
    </div>
  );
}
