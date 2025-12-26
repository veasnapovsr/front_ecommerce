import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useEffect, useState } from "react";

const PRODUCT_BASE_URL = "http://localhost:3002";
const CART_BASE_URL = "http://localhost:9003";

function ProductInfo() {
  const [inputValue, setInputValue] = useState<any>({});
  const productID = localStorage.getItem("productID");

  useEffect(() => {
    const fetchData = async () => {
      if (!productID) {
        console.error("No product ID found in localStorage");
        return;
      }

      try {
        const response = await fetch(`${PRODUCT_BASE_URL}/products/${productID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error(`Failed to fetch product. Status: ${response.status}`);
          return;
        }

        const data = await response.json();
        setInputValue(data || {});
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [productID]);

  const onSubmithandler = () => {
    const token = localStorage.getItem("token");
    if (!productID) {
      console.error("No product ID found when adding to cart");
      return;
    }

    if (token) {
      fetch(`${CART_BASE_URL}/cart/${productID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Added to cart");
          } else {
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <Fragment>
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile ">
                    <div className="row">
                      <div className="col-lg-4">
                        <img src={inputValue.image} alt="" />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <h4>{inputValue.name}</h4>
                          <p>{inputValue.description}</p>
                          <div className="main-button">
                            <button className="searchButton" type="button" onClick={onSubmithandler}>
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Category <span>{inputValue.category}</span>
                          </li>
                          <li>
                            Price <span>{inputValue.price}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductInfo;
