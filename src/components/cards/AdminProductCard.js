import React from "react";
import { Card } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Card style={{width: 200,
      border: '2px solid white',backgroundColor:"#f5faf0"}}
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "250px", objectFit: "cover" }}
          className="p-1"
        />
      }
      //`/admin/product/${slug}--> this is to be used for routes
      actions={[
        <Link to={`/admin/product/${slug}`}> 
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;