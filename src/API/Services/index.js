import { AuthService } from "./Auth"
import { BasketService } from "./Basket"
import { BrandService } from "./Brand"
import { CategoryService } from "./Category"
import { OrderService } from "./Order"
import { ProductService } from "./Product"
import { ProductReviewService } from "./ProductReview"
import { SliderService } from "./Slider"
import { StoreDatasService } from "./StoreDatas";

export const useService = () => {
    const services = {
        authService: new AuthService(),
        basketService: new BasketService(),
        brandService: new BrandService(),
        categoryService: new CategoryService(),
        orderService: new OrderService(),
        productService: new ProductService(),
        productReviewService: new ProductReviewService(),
        sliderService: new SliderService(),
        storeDataService: new StoreDatasService()
    }
    return services
}