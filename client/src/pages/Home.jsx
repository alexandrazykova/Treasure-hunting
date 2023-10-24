import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Search from "../components/Search";
import New from "../components/New";

const Home = () => {
  return (
    <div className="container">
      <Search />
      <CategoryMenu />
      <New />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
