import React from "react";
import styles from "./HomeCard.module.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const HomeCard = ({ product }) => {
  return (
    <div className={`col-md-3 ${styles.col}`}>
      {/* Starting with '/' means absolute path, starts with this */}
      <Link to={`/product/${product.slug}/`} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.cardImageWrapper}>
            <img
              src={`${BASE_URL}${product.image}`}
              alt="Product Image"
              className={styles.cardImgTop}
            />
          </div>
          <div className={`text-center ${styles.cardBody}`}>
            <h5 className={`${styles.cardTitle} mb-1`}> {product.name}</h5>
            <h6 className={styles.cardText}>$ {product.price}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
