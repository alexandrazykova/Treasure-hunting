import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="container">
      <Search />
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
