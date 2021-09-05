





import { Link } from "react-router-dom";
import "./CSS/Pricing.css"
let Pricing = () => {
  return (
    <div className = "pricingContainer">
      <div class="card cardSize">
      <div className=" image1"></div>
        <div class="card-body">
          <h5 class="card-title">Free to access</h5>
          <p class="card-text">
            You can access some content and functionality
          </p>
        </div>
      </div>
      <div class="card cardSize">
        <div className=" image2"></div>
        <div class="card-body">
          <h5 class="card-title">Paid To Access All</h5>
          <p class="card-text">
            You can Access All functionality After Payment
          </p>
          <Link href="#" class="btn btn-primary" to = "/Payment">
            Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
