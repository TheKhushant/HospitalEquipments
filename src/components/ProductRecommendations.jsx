import { useMemo } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';

const ProductRecommendations = ({ productId, productName }) => {
  const recommendations = useMemo(() => {
    const currentProduct = products.find((product) => product.id === productId);
    if (!currentProduct) {
      return products.slice(0, 4);
    }

    return products
      .filter((product) => product.id !== currentProduct.id && product.category === currentProduct.category)
      .slice(0, 4);
  }, [productId]);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-muted-foreground">You viewed</p>
            <h2 className="text-2xl font-semibold text-foreground">{productName}</h2>
            <p className="text-xl font-medium text-primary mt-1">
              Customers who viewed this also viewed
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/shop">
              Browse all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {recommendations.map((product) => (
            <Card
              key={product.id}
              className="min-w-[280px] snap-center hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 text-xs font-medium px-3 py-1 rounded-full shadow">
                    {product.category}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col items-start p-6 gap-3">
                <h3 className="font-semibold leading-tight line-clamp-2 h-12">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>

                <Button asChild className="w-full mt-2" size="lg">
                  <Link to={`/product/${product.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendations;