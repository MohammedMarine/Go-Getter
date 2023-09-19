import shoppingList from "../../assets/img/shopping-list.png";
import shoppingBag from "../../assets/img/shopping-bag.png";
import processing from "../../assets/img/processing.png";
import shop from "../../assets/img/shop.png";

export default function Process() {
  return (
    <div className="flex space-x-5 text-center m-5">
      <div className="w-20 md:w-[10rem]">
        <img src={shoppingList} alt="Logo_list" />
        <p className="m-2">Sélectionnez vos produits</p>
      </div>
      <div className="w-20 md:w-[10rem] ">
        <img src={shoppingBag} alt="Logo_bag" />
        <p className="m-2">Validez votre panier</p>
      </div>
      <div className="w-20 md:w-[10rem] ">
        <img src={processing} alt="Logo_processing" />
        <p className="m-2">Nous le préparons</p>
      </div>
      <div className="w-20 md:w-[10rem] ">
        <img src={shop} alt="Logo_shop" />
        <p className="m-2">Récupérez votre panier dans nos locaux</p>
      </div>
    </div>
  );
}
