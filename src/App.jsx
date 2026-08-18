import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  Search, User, Heart, ShoppingCart, Menu, X, Star, Plus, Minus,
  ChevronRight, MapPin, Truck, ShieldCheck, Clock,
  ArrowRight, Check, Package, CreditCard, ChevronDown,
} from "lucide-react";

/* =========================================================================
   BEYOND FRUITS — premium grocery e-commerce
   Editorial motion system. Restrained 3D. Real shopping UX.
========================================================================= */
const C = {
  bg: "#F7F4EA",
  bgAlt: "#F0EBDC",
  card: "#FFFFFF",
  ink: "#1E211C",
  inkDim: "#5B5B4F",
  inkFaint: "#8C8A78",
  line: "rgba(30,33,28,0.10)",
  lineStrong: "rgba(30,33,28,0.18)",
  accent: "#3E5D34",
  accentDeep: "#2E4626",
  accentSoft: "#EBEFE4",
};

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');";

const DISPLAY = "'Manrope', sans-serif";
const BODY = "'Inter', sans-serif";

/* ---------------- data ---------------- */
const CATEGORIES = [
  { name: "Fruits & Vegetables", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80" },
  { name: "Meat & Seafood", img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=500&q=80" },
  { name: "Dairy & Eggs", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80" },
  { name: "Bakery", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80" },
  { name: "Pantry", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80" },
  { name: "Drinks", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80" },
  { name: "Snacks", img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=500&q=80" },
  { name: "Household", img: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=500&q=80" },
];

const CATEGORY_DESCRIPTIONS = {
  "Fruits & Vegetables": "Farm-fresh produce picked at peak ripeness.",
  "Meat & Seafood": "Premium cuts and fresh-caught seafood.",
  "Dairy & Eggs": "Farm-sourced dairy and free-range eggs.",
  "Bakery": "Freshly baked breads and pastries every morning.",
  "Pantry": "Essential ingredients for your kitchen.",
  "Drinks": "Refreshing beverages for every moment.",
  "Snacks": "Delicious snacks for any time of day.",
  "Household": "Everyday essentials for your home.",
};

const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", title: "Fresh Produce" },
  { id: 2, src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80", title: "Dairy & Eggs" },
  { id: 3, src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", title: "Bakery" },
  { id: 4, src: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80", title: "Meat & Seafood" },
  { id: 5, src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80", title: "Drinks" },
  { id: 6, src: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80", title: "Snacks" },
  { id: 7, src: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=800&q=80", title: "Household" },
  { id: 8, src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80", title: "Fruits & Vegetables" },
  { id: 9, src: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80", title: "Pantry" },
  { id: 10, src: "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=800&q=80", title: "Weekly Essentials" },
  { id: 11, src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", title: "Fresh Meals" },
  { id: 12, src: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", title: "Morning Sourdough" },
];

const PRODUCTS = [
  { id: 1, cat: "Fruits & Vegetables", name: "Fresh Avocados", desc: "Hass, ripe & ready to eat", price: 280, unit: "4 pieces", rating: 4.8, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=80" },
  { id: 2, cat: "Fruits & Vegetables", name: "Vine Tomatoes", desc: "Vine-ripened, sweet and juicy", price: 180, unit: "1 kg", rating: 4.6, img: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?auto=format&fit=crop&w=700&q=80" },
  { id: 3, cat: "Fruits & Vegetables", name: "Baby Spinach", desc: "Washed, trimmed and ready to cook", price: 150, unit: "250 g", rating: 4.7, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=80" },
  { id: 4, cat: "Fruits & Vegetables", name: "Sweet Bananas", desc: "Naturally ripened, perfect for smoothies", price: 120, unit: "1 kg", rating: 4.6, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80" },
  { id: 5, cat: "Fruits & Vegetables", name: "Red Apples", desc: "Crisp, sweet and juicy", price: 220, unit: "6 pieces", rating: 4.5, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80" },
  { id: 6, cat: "Fruits & Vegetables", name: "Fresh Broccoli", desc: "Farm-fresh green heads", price: 160, unit: "1 head", rating: 4.4, img: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=700&q=80" },
  { id: 7, cat: "Meat & Seafood", name: "Free-Range Chicken", desc: "Whole, farm-raised and fresh", price: 850, unit: "1.5 kg", rating: 4.9, img: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=700&q=80" },
  { id: 8, cat: "Meat & Seafood", name: "Wild-Caught Tilapia", desc: "Filleted, sourced from Lake Victoria", price: 650, unit: "500 g", rating: 4.5, img: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=700&q=80" },
  { id: 9, cat: "Meat & Seafood", name: "Premium Beef Steak", desc: "Tender, grass-fed and aged", price: 1200, unit: "1 kg", rating: 4.8, img: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=700&q=80" },
  { id: 10, cat: "Meat & Seafood", name: "Fresh Prawns", desc: "Jumbo, peeled and deveined", price: 950, unit: "500 g", rating: 4.6, img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=80" },
  { id: 11, cat: "Dairy & Eggs", name: "Farm Eggs", desc: "Free-range, size large, tray of 30", price: 420, unit: "tray of 30", rating: 4.8, img: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=700&q=80" },
  { id: 12, cat: "Dairy & Eggs", name: "Fresh Milk", desc: "Pasteurized, whole milk", price: 140, unit: "1 L", rating: 4.6, img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80" },
  { id: 13, cat: "Dairy & Eggs", name: "Swiss Cheese", desc: "Aged, nutty and firm", price: 580, unit: "200 g", rating: 4.7, img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=700&q=80" },
  { id: 14, cat: "Dairy & Eggs", name: "Greek Yogurt", desc: "Thick, creamy and probiotic", price: 180, unit: "500 g", rating: 4.5, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80" },
  { id: 15, cat: "Bakery", name: "Sourdough Loaf", desc: "Baked fresh this morning", price: 320, unit: "1 loaf", rating: 4.9, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 16, cat: "Bakery", name: "Butter Croissants", desc: "Flaky, all-butter and golden", price: 280, unit: "pack of 4", rating: 4.7, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80" },
  { id: 17, cat: "Bakery", name: "Whole Wheat Bread", desc: "Soft, wholesome and fiber-rich", price: 180, unit: "1 loaf", rating: 4.4, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80" },
  { id: 18, cat: "Bakery", name: "Chocolate Muffins", desc: "Rich, moist and decadent", price: 240, unit: "pack of 3", rating: 4.6, img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=700&q=80" },
  { id: 19, cat: "Pantry", name: "Extra Virgin Olive Oil", desc: "Cold-pressed, premium quality", price: 950, unit: "500 ml", rating: 4.8, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80" },
  { id: 20, cat: "Pantry", name: "Basmati Rice", desc: "Aged, long-grain and aromatic", price: 380, unit: "2 kg", rating: 4.6, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80" },
  { id: 21, cat: "Pantry", name: "Honey", desc: "Pure, raw and unfiltered", price: 420, unit: "500 g", rating: 4.9, img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80" },
  { id: 22, cat: "Pantry", name: "Pasta", desc: "Durum wheat, al dente perfect", price: 160, unit: "500 g", rating: 4.3, img: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=700&q=80" },
  { id: 23, cat: "Drinks", name: "Cold-Pressed Orange Juice", desc: "No added sugar, pure sunshine", price: 320, unit: "1 L", rating: 4.7, img: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=700&q=80" },
  { id: 24, cat: "Drinks", name: "Sparkling Water", desc: "Naturally carbonated, crisp and clean", price: 120, unit: "750 ml", rating: 4.4, img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80" },
  { id: 25, cat: "Drinks", name: "Iced Coffee", desc: "Cold brew, smooth and bold", price: 280, unit: "500 ml", rating: 4.6, img: "https://images.unsplash.com/photo-1461023058943-35fc6b5fc921?auto=format&fit=crop&w=700&q=80" },
  { id: 26, cat: "Drinks", name: "Mango Juice", desc: "Tropical, refreshing and sweet", price: 260, unit: "1 L", rating: 4.5, img: "https://images.unsplash.com/photo-1546173159-315a8a2f8ad8?auto=format&fit=crop&w=700&q=80" },
  { id: 27, cat: "Snacks", name: "Roasted Cashews", desc: "Lightly salted, premium quality", price: 480, unit: "250 g", rating: 4.8, img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=700&q=80" },
  { id: 28, cat: "Snacks", name: "Trail Mix", desc: "Nuts, seeds and dried fruits", price: 350, unit: "300 g", rating: 4.5, img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=700&q=80" },
  { id: 29, cat: "Snacks", name: "Dark Chocolate", desc: "72% cocoa, rich and velvety", price: 280, unit: "100 g", rating: 4.7, img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=700&q=80" },
  { id: 30, cat: "Household", name: "Dish Soap Refill", desc: "Plant-based formula, gentle on hands", price: 260, unit: "750 ml", rating: 4.5, img: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=700&q=80" },
  { id: 31, cat: "Household", name: "Laundry Detergent", desc: "Fresh scent, tough on stains", price: 480, unit: "1 L", rating: 4.4, img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e4?auto=format&fit=crop&w=700&q=80" },
  { id: 32, cat: "Household", name: "Kitchen Towels", desc: "Absorbent, soft and disposable", price: 180, unit: "roll of 2", rating: 4.3, img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=700&q=80" },
];

const RECIPES = [
  { title: "Avocado & Tomato Salad", time: "15 min", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80", ids: [1, 2] },
  { title: "Herb-Roasted Chicken", time: "50 min", img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=700&q=80", ids: [5, 11] },
  { title: "Morning Sourdough Toast", time: "10 min", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80", ids: [9, 8] },
];

/* ---------------- cart context ---------------- */
const StoreCtx = createContext(null);
function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const addToCart = (id, qty = 1) =>
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id, qty }];
    });
  const setQty = (id, qty) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const toggleWishlist = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartItems = cart.map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id) }));
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  return (
    <StoreCtx.Provider value={{ cart, cartItems, cartCount, subtotal, addToCart, setQty, removeFromCart, wishlist, toggleWishlist }}>
      {children}
    </StoreCtx.Provider>
  );
}
const useStore = () => useContext(StoreCtx);

/* ---------------- logo ---------------- */
function Logo({ size = "md", variant = "full", className = "" }) {
  const iconSize = size === "md" ? 36 : 28;
  const iconOnly = variant === "icon";
  return (
    <div className={`flex items-center gap-2.5 shrink-0 select-none ${className}`}>
      <img
        src="/logo new.png"
        alt="Beyond Fruits"
        width={iconSize}
        height={iconSize}
        className="shrink-0 object-contain"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.12))' }}
      />
      {!iconOnly && (
        <div className="flex flex-col">
          <span
            style={{ fontFamily: DISPLAY, color: C.ink }}
            className="text-[22px] font-extrabold leading-none tracking-tight"
          >
            Beyond<span style={{ color: C.accent }}>.</span>
          </span>
          <span
            style={{ color: C.accentDeep }}
            className="text-[9px] font-bold tracking-[0.22em] leading-none mt-0.5"
          >
            FRUITS
          </span>
        </div>
      )}
    </div>
  );
}

/* ---------------- small ui bits ---------------- */
function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase mb-3" style={{ color: C.accent, fontFamily: BODY, letterSpacing: "0.18em", fontWeight: 600 }}>
      <span style={{ width: 16, height: 1.5, background: C.accent }} />
      {children}
    </div>
  );
}
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={12} color={C.accent} fill={C.accent} />
      <span style={{ color: C.inkDim, fontFamily: BODY }} className="text-xs">{rating}</span>
    </div>
  );
}
function Price({ v }) {
  return <span>KES {v.toLocaleString()}</span>;
}

/* ---------------- motion system ---------------- */
function useReveal(options = {}) {
  const { threshold = 0.12, once = true } = options;
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); if (once) io.unobserve(el); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, shown];
}

function RevealUp({ children, delay = 0, className = "", distance = 40 }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : `translateY(${distance}px)`,
      transition: `opacity 0.9s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 0.9s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
function RevealScale({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "scale(1)" : "scale(0.97)",
      transition: `opacity 0.9s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 0.9s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
function RevealStagger({ children, delay = 0, className = "", stagger = 70 }) {
  const [ref, shown] = useReveal();
  const items = Array.isArray(children) ? children : [children];
  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div key={i} style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(30px)",
          transition: `opacity 0.7s cubic-bezier(.2,.7,.3,1) ${delay + i * stagger}ms, transform 0.7s cubic-bezier(.2,.7,.3,1) ${delay + i * stagger}ms`,
        }}>
          {child}
        </div>
      ))}
    </div>
  );
}
function RevealImage({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: shown ? 1 : 0,
      clipPath: shown ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 8% 0%)",
      transform: shown ? "scale(1)" : "scale(1.03)",
      transition: `opacity 1s cubic-bezier(.2,.7,.3,1) ${delay}ms, clip-path 1s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 1s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ---------------- premium tilt hook ---------------- */
function useTilt(intensity = 6) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;
      setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
    };
    const handleMouseLeave = () => {
      setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    };
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);
  return [ref, transform];
}

/* ---------------- product card ---------------- */
function ProductCard({ p, onOpen }) {
  const { cart, addToCart, setQty, wishlist, toggleWishlist } = useStore();
  const inCart = cart.find((i) => i.id === p.id);
  const liked = wishlist.includes(p.id);
  const [tiltRef, tiltTransform] = useTilt(6);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = useCallback((e) => {
    e.stopPropagation();
    addToCart(p.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 400);
  }, [p.id, addToCart]);

  return (
    <div
      ref={tiltRef}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: C.card,
        border: `1px solid ${C.line}`,
        transform: tiltTransform,
        transition: 'transform 0.15s ease-out, box-shadow 0.35s ease',
      }}
    >
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onOpen(p)}>
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-44 sm:h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ willChange: 'transform' }}
        />
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
          style={{ background: "rgba(247,244,234,0.92)", backdropFilter: 'blur(4px)' }}
        >
          <Heart size={14} color={liked ? C.accent : C.inkDim} fill={liked ? C.accent : "none"} />
        </button>
      </div>
      <div className="flex-1 p-4 pt-3.5">
        <div style={{ color: C.inkFaint, fontFamily: BODY }} className="text-[11px] uppercase tracking-wide mb-1">{p.cat}</div>
        <h3
          onClick={() => onOpen(p)}
          style={{ fontFamily: DISPLAY, color: C.ink }}
          className="text-[15px] font-semibold mb-0.5 cursor-pointer leading-snug"
        >
          {p.name}
        </h3>
        <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-xs mb-1.5">{p.desc} · {p.unit}</p>
        <Stars rating={p.rating} />
      </div>
      <div className="flex items-center justify-between mt-3 px-4 pb-4">
        <span style={{ fontFamily: DISPLAY, color: C.ink, fontWeight: 700 }} className="text-[15px]">
          <Price v={p.price} />
        </span>
        {inCart ? (
          <div className="flex items-center gap-2.5 rounded-xl overflow-hidden" style={{ border: `1px solid ${C.lineStrong}` }}>
            <button onClick={() => setQty(p.id, inCart.qty - 1)} className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-black/5"><Minus size={12} color={C.ink} /></button>
            <span style={{ fontFamily: BODY, color: C.ink }} className="text-xs font-semibold w-3 text-center">{inCart.qty}</span>
            <button onClick={() => setQty(p.id, inCart.qty + 1)} className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-black/5"><Plus size={12} color={C.ink} /></button>
          </div>
        ) : (
          <motion.button
            onClick={handleAdd}
            className="px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 rounded-lg"
            style={{ background: justAdded ? C.accentDeep : C.accent, color: "#fff" }}
            animate={justAdded ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <Plus size={12} /> Add
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ---------------- header (scroll-aware, premium) ---------------- */
function Header({ onNavigate, openCart, openSearch, setOpenSearch, searchQuery, setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const nav = ["Home", "Shop", "Gallery"];
  const mobileNav = ["Home", "Shop", "Gallery", "About", "Account"];
  const go = useCallback((p) => { onNavigate(p); setMenuOpen(false); }, [onNavigate]);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 120], ["rgba(247,244,234,0.0)", "rgba(247,244,234,0.95)"]);
  const navBorder = useTransform(scrollY, [0, 120], ["rgba(30,33,28,0)", "rgba(30,33,28,0.10)"]);
  const navShadow = useTransform(scrollY, [0, 120], ["0 0 0 rgba(0,0,0,0)", "0 4px 20px rgba(0,0,0,0.06)"]);
  const navHeight = useTransform(scrollY, [0, 120], ["68px", "60px"]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: navBg,
        borderBottom: `1px solid transparent`,
        borderBottomColor: navBorder,
        boxShadow: navShadow,
        height: navHeight,
        transition: 'backdrop-filter 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between gap-4">
        <button onClick={() => go("home")} className="shrink-0">
          <Logo />
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((l) => (
            <button
              key={l}
              onClick={() => go(l.toLowerCase())}
              className="text-[13px] relative group"
              style={{ color: C.inkDim, fontFamily: BODY, fontWeight: 500 }}
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ background: C.accent }} />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => setOpenSearch((s) => !s)} className="w-9 h-9 flex items-center justify-center transition-colors hover:bg-black/5 rounded-full"><Search size={17} color={C.ink} /></button>
          <button onClick={() => go("account")} className="w-9 h-9 hidden sm:flex items-center justify-center transition-colors hover:bg-black/5 rounded-full"><User size={17} color={C.ink} /></button>
          <button onClick={() => go("wishlist")} className="w-9 h-9 flex items-center justify-center relative transition-colors hover:bg-black/5 rounded-full">
            <Heart size={17} color={C.ink} />
            {wishlist.length > 0 && <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center text-white" style={{ background: C.accent }}>{wishlist.length}</span>}
          </button>
          <motion.button
            onClick={openCart}
            className="w-9 h-9 flex items-center justify-center relative transition-colors hover:bg-black/5 rounded-full"
            whileTap={{ scale: 0.92 }}
          >
            <ShoppingCart size={17} color={C.ink} />
            {cartCount > 0 && (
              <motion.span
                className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center text-white font-bold"
                style={{ background: C.accent }}
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
          <button className="lg:hidden w-9 h-9 flex items-center justify-center transition-colors hover:bg-black/5 rounded-full" onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X size={18} color={C.ink} /> : <Menu size={18} color={C.ink} />}
          </button>
        </div>
      </div>

      {openSearch && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t" style={{ borderColor: C.line }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3">
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { go("shop"); setOpenSearch(false); } }}
              placeholder="Search groceries..."
              className="w-full bg-transparent outline-none text-sm py-1.5"
              style={{ color: C.ink, fontFamily: BODY, borderBottom: `1px solid ${C.lineStrong}` }}
            />
          </div>
        </motion.div>
      )}

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden px-5 pb-5 flex flex-col gap-4"
          style={{ borderTop: `1px solid ${C.line}`, background: 'rgba(247,244,234,0.98)', backdropFilter: 'blur(16px)' }}
        >
          {mobileNav.map((l) => {
            const target = l.toLowerCase();
            const page = target === "home" ? "home" : target === "shop" ? "shop" : target === "gallery" ? "gallery" : target === "about" ? "about" : target === "account" ? "account" : "shop";
            return (
              <button key={l} onClick={() => go(page)} className="text-left pt-4 text-sm font-medium" style={{ color: C.ink }}>{l}</button>
            );
          })}
        </motion.div>
      )}
    </motion.header>
  );
}

/* ---------------- cart drawer ---------------- */
function CartDrawer({ open, onClose, onNavigate }) {
  const { cartItems, setQty, removeFromCart, subtotal } = useStore();
  const deliveryFee = subtotal > 0 ? 150 : 0;
  const [removingIds, setRemovingIds] = useState([]);

  const handleRemove = useCallback((id) => {
    setRemovingIds((prev) => [...prev, id]);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingIds((prev) => prev.filter((x) => x !== id));
    }, 300);
  }, [removeFromCart]);

  return (
    <>
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: open ? "auto" : "none", background: "rgba(20,20,15,0.45)" }}
        className="fixed inset-0 z-[60]"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[70] flex flex-col"
        style={{ background: "rgba(247, 244, 234, 0.97)", borderLeft: `1px solid ${C.lineStrong}` }}
      >
        <div className="flex items-center justify-between px-6 h-16 shrink-0" style={{ borderBottom: `1px solid ${C.line}` }}>
          <h3 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-lg font-bold">Your basket</h3>
          <button onClick={onClose}><X size={19} color={C.ink} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Package size={30} color={C.inkFaint} />
              <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm mt-4">Your basket is empty.</p>
            </div>
          ) : (
            <motion.div className="space-y-5" initial="hidden" animate="visible" variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}>
              {cartItems.map(({ product, qty }) => {
                const isRemoving = removingIds.includes(product.id);
                return (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                      exit: { opacity: 0, x: -20, transition: { duration: 0.25 } }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`flex gap-3.5 ${isRemoving ? 'opacity-0 translate-x-4' : 'opacity-100'} transition-all duration-300`}
                  >
                    <img src={product.img} className="w-16 h-16 object-cover shrink-0 rounded-xl" alt={product.name} />
                    <div className="flex-1 min-w-0">
                      <div style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-semibold truncate">{product.name}</div>
                      <div style={{ color: C.inkFaint, fontFamily: BODY }} className="text-xs mb-2">{product.unit}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
                          <button onClick={() => setQty(product.id, qty - 1)} className="w-6 h-6 flex items-center justify-center transition-colors hover:bg-black/5"><Minus size={11} /></button>
                          <span className="text-xs w-3 text-center" style={{ fontFamily: BODY }}>{qty}</span>
                          <button onClick={() => setQty(product.id, qty + 1)} className="w-6 h-6 flex items-center justify-center transition-colors hover:bg-black/5"><Plus size={11} /></button>
                        </div>
                        <span style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-bold"><Price v={product.price * qty} /></span>
                      </div>
                    </div>
                    <button onClick={() => handleRemove(product.id)} className="shrink-0 transition-opacity hover:opacity-70"><X size={14} color={C.inkFaint} /></button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="px-6 py-5 shrink-0" style={{ borderTop: `1px solid ${C.line}` }}>
            <div className="flex justify-between text-sm mb-1.5" style={{ color: C.inkDim, fontFamily: BODY }}>
              <span>Subtotal</span><span><Price v={subtotal} /></span>
            </div>
            <div className="flex justify-between text-sm mb-3.5" style={{ color: C.inkDim, fontFamily: BODY }}>
              <span>Delivery</span><span><Price v={deliveryFee} /></span>
            </div>
            <div className="flex justify-between text-base mb-5 pt-3.5" style={{ color: C.ink, fontFamily: DISPLAY, fontWeight: 700, borderTop: `1px solid ${C.line}` }}>
              <span>Total</span><span><Price v={subtotal + deliveryFee} /></span>
            </div>
            <motion.button
              onClick={() => { onClose(); onNavigate("checkout"); }}
              className="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
              style={{ background: C.accent, color: "#fff" }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Continue to checkout <ArrowRight size={15} />
            </motion.button>
            <p style={{ color: C.inkFaint, fontFamily: BODY }} className="text-[11px] text-center mt-3">Estimated delivery: today, 4–6pm</p>
          </div>
        )}
      </motion.div>
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onNavigate }) {
  const go = useCallback((p) => { onNavigate(p); }, [onNavigate]);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.94]);
  const heroY = useTransform(scrollY, [0, 500], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse parallax (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Parallax transforms for different layers
  const bgX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const midX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const midY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const fgX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const fgY = useTransform(springY, [-0.5, 0.5], [-24, 24]);

  const headlineWords = "Freshness, taken beyond.".split(" ");

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: C.bg }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background organic shapes */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: bgX, y: bgY }}>
        <svg className="absolute -top-20 -left-20 w-[500px] h-[500px] opacity-[0.06]" viewBox="0 0 200 200" fill="none">
          <path d="M44.7,-76.4C58.8,-69.2,71.8,-58.1,79.6,-44.3C87.4,-30.5,90,-14,87.6,1.3C85.2,16.6,76.8,31.2,66.3,42.9C55.8,54.6,43.2,63.4,29.6,69.2C16,75,1.4,77.8,-12.8,75.6C-27,73.4,-40.8,66.2,-52.3,56.1C-63.8,46,-72.9,33,-78.3,18.3C-83.7,3.6,-85.4,-12.8,-79.9,-27.4C-74.4,-42,-61.7,-54.8,-47.6,-63.1C-33.5,-71.4,-18,-75.2,-0.8,-73.8C16.4,-72.4,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" fill={C.accent} />
        </svg>
        <svg className="absolute top-1/3 -right-20 w-[400px] h-[400px] opacity-[0.04]" viewBox="0 0 200 200" fill="none">
          <path d="M39.9,-65.7C52.6,-58.3,64.3,-48.2,71.6,-35.8C78.9,-23.4,81.8,-8.7,79.5,5.2C77.2,19.1,69.7,32.2,59.8,42.3C49.9,52.4,37.6,59.5,24.4,64.8C11.2,70.1,-2.9,73.6,-16.8,71.3C-30.7,69,-44.4,60.9,-55.2,49.8C-66,38.7,-73.9,24.6,-77.1,9.3C-80.3,-6,-78.8,-22.5,-71.5,-36.3C-64.2,-50.1,-51.1,-61.2,-37.3,-68.2C-23.5,-75.2,-8.9,-78.1,4.2,-78.9C17.3,-79.7,27.2,-73.1,39.9,-65.7Z" transform="translate(100 100)" fill={C.accentDeep} />
        </svg>
      </motion.div>

      {/* Floating produce imagery with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Background layer (slowest) */}
        <motion.div className="absolute -top-10 -left-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden opacity-90" style={{ x: bgX, y: bgY, zIndex: 1 }}>
          <img src={PRODUCTS[0].img} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Midground layer */}
        <motion.div className="absolute top-20 right-1/4 w-40 h-40 sm:w-52 sm:h-52 rounded-2xl overflow-hidden opacity-85 hidden lg:block" style={{ x: midX, y: midY, zIndex: 2 }}>
          <img src={PRODUCTS[4].img} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Foreground layer (fastest) */}
        <motion.div className="absolute bottom-32 left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden opacity-80 hidden md:block" style={{ x: fgX, y: fgY, zIndex: 3 }}>
          <img src={PRODUCTS[6].img} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Decorative dots */}
        <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full opacity-40 hidden lg:block" style={{ background: C.accent, zIndex: 1 }} />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full opacity-30 hidden lg:block" style={{ background: C.accentDeep, zIndex: 1 }} />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full opacity-20 hidden lg:block" style={{ background: C.accent, zIndex: 1 }} />
      </div>

      {/* Hero content with scroll-driven transform */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-20"
        style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full" style={{ background: C.accentSoft }}>
              <MapPin size={12} color={C.accent} />
              <span style={{ color: C.accentDeep, fontFamily: BODY }} className="text-xs font-semibold">Fresh groceries · Same-day delivery</span>
            </div>
          </motion.div>

          {/* Headline with word-by-word reveal */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            style={{ fontFamily: DISPLAY, color: C.ink }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[1.02] tracking-tight mb-6"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ color: C.inkDim, fontFamily: BODY }}
            className="text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
          >
            Quality produce, everyday essentials, and everything your kitchen needs — delivered fresh.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap gap-3.5"
          >
            <motion.button
              onClick={() => go("shop")}
              className="btn-primary px-8 py-4 text-base font-semibold flex items-center gap-2"
              style={{ background: C.accent, color: "#fff" }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Shop fresh <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={() => go("shop")}
              className="btn-primary px-8 py-4 text-base font-semibold"
              style={{ border: `1px solid ${C.lineStrong}`, color: C.ink }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore the market
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ color: C.inkFaint }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor: C.line }}>
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: C.accent }}
            animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOME ---------------- */
function Home({ openProduct, onNavigate }) {
  const featured = PRODUCTS.slice(0, 8);
  const go = useCallback((p) => { onNavigate(p); }, [onNavigate]);

  return (
    <div>
      <Hero onNavigate={onNavigate} />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16 pt-4">
        <RevealUp delay={100}>
          <Eyebrow>Categories</Eyebrow>
        </RevealUp>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((c, i) => (
            <RevealScale key={c.name} delay={i * 60}>
              <motion.button
                onClick={() => go("shop")}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] text-left"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontFamily: DISPLAY }} className="text-white text-sm sm:text-base font-semibold drop-shadow-md">{c.name}</span>
                    <ChevronRight size={14} className="text-white/70 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                </div>
              </motion.button>
            </RevealScale>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
        <RevealUp delay={0}>
          <div className="flex items-end justify-between mb-8">
            <div>
              <Eyebrow>Featured</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-2xl sm:text-3xl font-bold">This week's picks</h2>
            </div>
            <button onClick={() => go("shop")} className="hidden sm:flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-70" style={{ color: C.accent }}>View all <ChevronRight size={14} /></button>
          </div>
        </RevealUp>
        <RevealStagger delay={100} stagger={80}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
            {featured.map((p) => <ProductCard p={p} key={p.id} onOpen={openProduct} />)}
          </div>
        </RevealStagger>
      </section>

      {/* Fresh Today */}
      <section style={{ background: C.bgAlt, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <RevealUp delay={0}>
            <Eyebrow>Fresh today</Eyebrow>
            <h2 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl sm:text-4xl font-bold mb-3 max-w-md leading-tight">Picked with care. Delivered while it's still good.</h2>
          </RevealUp>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-9">
            {CATEGORIES.slice(0, 5).map((c, i) => (
              <RevealImage key={c.name} delay={i * 80}>
                <div className="overflow-hidden rounded-2xl">
                  <img src={c.img} alt={c.name} className="w-full h-40 object-cover" />
                </div>
              </RevealImage>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {[
            [ShieldCheck, "Freshly Selected", "Products chosen for quality."],
            [Truck, "Fast Delivery", "Groceries delivered when you need them."],
            [Check, "Quality Guaranteed", "If something isn't right, we'll make it right."],
            [CreditCard, "Secure Checkout", "Simple and secure payments."],
          ].map(([Icon, t, b], i) => (
            <RevealUp key={t} delay={i * 100}>
              <div className={i > 0 ? "sm:pl-6 lg:border-l" : ""} style={{ borderColor: C.line }}>
                <Icon size={20} color={C.accent} strokeWidth={1.6} />
                <h3 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-[15px] font-bold mt-3.5 mb-1.5">{t}</h3>
                <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm">{b}</p>
              </div>
            </RevealUp>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <RevealUp delay={0}>
          <div className="text-center mb-12">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl sm:text-4xl font-bold">What our customers say</h2>
          </div>
        </RevealUp>
        <RevealStagger delay={100} stagger={100}>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah W.", text: "The freshest produce I've found in Nairobi. Delivery was lightning fast!", rating: 5 },
              { name: "James K.", text: "Finally, a grocery service that actually delivers on quality. Highly recommend!", rating: 5 },
              { name: "Amina H.", text: "Love the variety and the same-day delivery. It's made my life so much easier.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl p-6 sm:p-8" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                <Stars rating={t.rating} />
                <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm mt-4 leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: C.accent }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-semibold">{t.name}</div>
                    <div style={{ color: C.inkFaint }} className="text-xs">Verified customer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealStagger>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <RevealScale delay={0}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-6 text-center">
            {[
              ["15K+", "Happy customers"],
              ["200+", "Fresh products"],
              ["30min", "Avg delivery"],
              ["4.8/5", "Average rating"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div style={{ fontFamily: DISPLAY, color: C.accent }} className="text-3xl sm:text-4xl font-extrabold mb-1">{stat}</div>
                <div style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm">{label}</div>
              </div>
            ))}
          </div>
        </RevealScale>
      </section>

      {/* Editorial store showcase */}
      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pb-16">
        <RevealImage delay={0}>
          <div className="relative overflow-hidden rounded-[2.5rem]" style={{ border: `1px solid ${C.lineStrong}` }}>
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1600&q=80"
              alt="Premium grocery store interior"
              className="w-full h-[400px] sm:h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.95)', border: `1px solid ${C.lineStrong}` }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: C.accent }} />
                <span style={{ fontFamily: DISPLAY, color: C.ink }} className="text-xs font-bold tracking-wide">PREMIUM STORE</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <h2 style={{ fontFamily: DISPLAY, color: '#fff' }} className="text-2xl sm:text-4xl font-extrabold leading-tight drop-shadow-lg">
                Experience the<br />
                <span style={{ color: C.accentSoft }}>Beyond Fruits</span> difference
              </h2>
            </div>
          </div>
        </RevealImage>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
        <RevealImage delay={0}>
          <div className="relative overflow-hidden h-[320px] sm:h-[380px] flex items-end rounded-[2rem]">
            <img src="https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=1400&q=80" alt="Weekly essentials" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(20,22,17,0.72), rgba(20,22,17,0.08) 55%)" }} />
            <div className="relative p-8 sm:p-12">
              <div style={{ color: "#D9E4CB", fontFamily: BODY, letterSpacing: "0.18em" }} className="text-[11px] uppercase font-semibold mb-3">Weekly essentials</div>
              <h2 style={{ fontFamily: DISPLAY, color: "#fff" }} className="text-2xl sm:text-4xl font-bold mb-5 max-w-md leading-tight">Save on the groceries you actually buy.</h2>
              <motion.button
                onClick={() => go("shop")}
                className="px-6 py-3 text-sm font-semibold flex items-center gap-2 rounded-xl"
                style={{ background: "#fff", color: C.ink }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Shop weekly deals <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>
        </RevealImage>
      </section>

      {/* Recipes */}
      <section style={{ background: C.bgAlt, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <RevealUp delay={0}>
            <Eyebrow>Inspiration</Eyebrow>
            <h2 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl sm:text-4xl font-bold mb-10 leading-tight">What's for dinner?</h2>
          </RevealUp>
          <div className="grid sm:grid-cols-3 gap-6">
            {RECIPES.map((r, i) => (
              <RevealScale key={r.title} delay={i * 100}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden mb-4 rounded-2xl">
                    <img src={r.img} alt={r.title} className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-2 mb-1.5" style={{ color: C.inkFaint, fontFamily: BODY }}>
                    <Clock size={12} /><span className="text-xs">{r.time}</span>
                  </div>
                  <h3 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-lg font-bold mb-3">{r.title}</h3>
                  <button onClick={() => go("shop")} className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:opacity-70" style={{ color: C.accent }}>Shop ingredients <ChevronRight size={13} /></button>
                </div>
              </RevealScale>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <RevealUp delay={0}>
          <Eyebrow>Delivery</Eyebrow>
          <h2 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl sm:text-4xl font-bold mb-10 leading-tight">Choose. We pack. We deliver.</h2>
        </RevealUp>
        <div className="grid sm:grid-cols-3 gap-6 relative">
          {[
            ["Choose your groceries", "Browse the full catalogue and build your basket."],
            ["We carefully pack them", "Every order is checked and packed within the hour."],
            ["We deliver to your door", "A rider brings it to you, same-day, across Nairobi."],
          ].map(([t, b], i) => (
            <RevealUp key={t} delay={i * 120}>
              <div className="pt-5" style={{ borderTop: `2px solid ${i === 2 ? C.accent : C.line}` }}>
                <div style={{ fontFamily: DISPLAY, color: C.inkFaint }} className="text-xs font-bold mb-2.5">{String(i + 1).padStart(2, "0")}</div>
                <h3 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-base font-bold mb-1.5">{t}</h3>
                <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm">{b}</p>
              </div>
            </RevealUp>
          ))}
        </div>
        <RevealUp delay={200}>
          <div className="inline-flex items-center gap-2 px-3.5 py-2 mt-8" style={{ background: C.accentSoft }}>
            <Truck size={13} color={C.accent} /><span style={{ color: C.accentDeep, fontFamily: BODY }} className="text-xs font-semibold">Same-day delivery available</span>
          </div>
        </RevealUp>
      </section>
    </div>
  );
}

/* ---------------- SHOP ---------------- */
function Shop({ openProduct, searchQuery }) {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Featured");
  const cats = ["All", ...CATEGORIES.map((c) => c.name)];

  const getFilteredProducts = () => {
    let list = PRODUCTS.filter((p) => (cat === "All" || p.cat === cat) && p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  };

  const filtered = getFilteredProducts();
  const grouped = cat === "All" && !searchQuery
    ? CATEGORIES.map((c) => ({ ...c, products: PRODUCTS.filter((p) => p.cat === c.name) })).filter((g) => g.products.length > 0)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      <RevealUp>
        <Eyebrow>Shop</Eyebrow>
        <h1 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl sm:text-4xl font-extrabold mb-2">All groceries</h1>
        <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm mb-8">Browse our full catalogue of fresh groceries, delivered same-day across Nairobi.</p>
      </RevealUp>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-10">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className="px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 rounded-lg" style={{ background: cat === c ? C.accent : "transparent", color: cat === c ? "#fff" : C.inkDim, border: `1px solid ${cat === c ? C.accent : C.line}` }}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative shrink-0">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none pr-8 pl-3 py-2 text-xs font-medium rounded-lg" style={{ background: C.card, border: `1px solid ${C.line}`, color: C.ink, fontFamily: BODY }}>
            {["Featured", "Price: Low to High", "Price: High to Low", "Rating"].map((s) => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" color={C.inkDim} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm py-16 text-center">No products match "{searchQuery}".</p>
      ) : (
        <>
          <p style={{ color: C.inkFaint, fontFamily: BODY }} className="text-xs mb-6">{filtered.length} products</p>
          {grouped.length > 0 ? (
            <div className="space-y-12">
              {grouped.map((group) => (
                <div key={group.name}>
                  <RevealUp>
                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <h2 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-xl sm:text-2xl font-bold">{group.name}</h2>
                        <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-xs mt-1">{CATEGORY_DESCRIPTIONS[group.name]}</p>
                      </div>
                      <span style={{ color: C.inkFaint }} className="text-xs">{group.products.length} items</span>
                    </div>
                  </RevealUp>
                  <RevealStagger delay={100} stagger={60}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
                      {group.products.map((p) => <ProductCard p={p} key={p.id} onOpen={openProduct} />)}
                    </div>
                  </RevealStagger>
                </div>
              ))}
            </div>
          ) : (
            <RevealStagger delay={0} stagger={60}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
                {filtered.map((p) => <ProductCard p={p} key={p.id} onOpen={openProduct} />)}
              </div>
            </RevealStagger>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------- PRODUCT DETAIL ---------------- */
function ProductDetail({ product, openProduct }) {
  const { cart, addToCart, setQty } = useStore();
  const inCart = cart.find((i) => i.id === product.id);
  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 400);
  }, [product.id, addToCart]);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <RevealImage>
          <div className="relative overflow-hidden rounded-2xl" style={{ boxShadow: '0 24px 48px -12px rgba(30, 33, 28, 0.12)' }}>
            <img src={product.img} alt={product.name} className="w-full h-[380px] sm:h-[460px] object-cover" />
          </div>
        </RevealImage>
        <RevealUp delay={120}>
          <div style={{ color: C.inkFaint, fontFamily: BODY }} className="text-xs uppercase tracking-wide mb-2">{product.cat}</div>
          <h1 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl sm:text-4xl font-extrabold mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-5"><Stars rating={product.rating} /><span style={{ color: C.inkFaint }} className="text-xs">·</span><span style={{ color: C.inkDim, fontFamily: BODY }} className="text-xs">{product.unit}</span></div>
          <div style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl font-extrabold mb-6"><Price v={product.price} /></div>
          <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm leading-relaxed mb-6 max-w-md">
            {product.desc}. Sourced and graded the same day it ships, so what arrives is what you'd pick yourself at the market.
          </p>
          <div className="flex items-center gap-2 mb-8" style={{ color: C.accentDeep, fontFamily: BODY }}>
            <Truck size={14} color={C.accent} /><span className="text-xs font-medium">Available for same-day delivery</span>
          </div>
          <div className="p-4 mb-8 inline-flex items-center gap-3 rounded-xl" style={{ background: 'rgba(235, 239, 228, 0.8)' }}>
            <MapPin size={16} color={C.accent} />
            <div>
              <div style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-semibold">Delivery today</div>
              <div style={{ color: C.inkDim }} className="text-xs">Estimated 4:00 – 6:00 PM across Nairobi</div>
            </div>
          </div>
          {inCart ? (
            <div className="flex items-center gap-3 w-fit rounded-xl overflow-hidden" style={{ border: `1px solid ${C.lineStrong}` }}>
              <button onClick={() => setQty(product.id, inCart.qty - 1)} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-black/5"><Minus size={14} /></button>
              <span style={{ fontFamily: BODY }} className="text-sm font-semibold w-4 text-center">{inCart.qty}</span>
              <button onClick={() => setQty(product.id, inCart.qty + 1)} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-black/5"><Plus size={14} /></button>
            </div>
          ) : (
            <motion.button
              onClick={handleAdd}
              className="btn-primary px-7 py-3.5 text-sm font-semibold flex items-center gap-2 rounded-xl"
              style={{ background: added ? C.accentDeep : C.accent, color: "#fff" }}
              animate={added ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <Plus size={15} /> Add to basket
            </motion.button>
          )}
        </RevealUp>
      </div>

      {related.length > 0 && (
        <div>
          <Eyebrow>You may also like</Eyebrow>
          <RevealStagger delay={100} stagger={60}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9 mt-4">
              {related.map((p) => <ProductCard p={p} key={p.id} onOpen={openProduct} />)}
            </div>
          </RevealStagger>
        </div>
      )}
    </div>
  );
}

/* ---------------- CHECKOUT ---------------- */
function Checkout({ onNavigate }) {
  const { cartItems, subtotal } = useStore();
  const deliveryFee = subtotal > 0 ? 150 : 0;
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14">
      <RevealUp>
        <Eyebrow>Checkout</Eyebrow>
        <h1 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl font-extrabold mb-8">Review & confirm</h1>
      </RevealUp>

      <RevealUp delay={100}>
        <div className="flex items-center gap-4 mb-10">
          {[
            ["Cart", 1],
            ["Checkout", 2],
            ["Confirm", 3],
          ].map(([label, num], i, arr) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: num <= 2 ? C.accent : C.card, color: num <= 2 ? '#fff' : C.inkDim, border: `1px solid ${num > 2 ? C.line : 'transparent'}` }}>{num}</div>
                <span className="text-sm font-medium hidden sm:inline" style={{ color: num <= 2 ? C.ink : C.inkFaint }}>{label}</span>
              </div>
              {i < arr.length - 1 && <div className="h-0.5 flex-1" style={{ background: C.line }} />}
            </div>
          ))}
        </div>
      </RevealUp>

      {cartItems.length === 0 ? (
        <RevealUp delay={150}>
          <div className="text-center py-16">
            <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm mb-5">Your basket is empty.</p>
            <button onClick={() => onNavigate("shop")} className="btn-primary px-6 py-3 text-sm font-semibold rounded-xl" style={{ background: C.accent, color: "#fff" }}>Browse groceries</button>
          </div>
        </RevealUp>
      ) : (
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10">
          <div>
            <div className="space-y-5 mb-8">
              {cartItems.map(({ product, qty }) => (
                <RevealUp key={product.id} delay={0}>
                  <div className="flex gap-4 pb-5" style={{ borderBottom: `1px solid ${C.line}` }}>
                    <img src={product.img} className="w-16 h-16 object-cover rounded-xl" alt={product.name} />
                    <div className="flex-1">
                      <div style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-semibold">{product.name}</div>
                      <div style={{ color: C.inkFaint, fontFamily: BODY }} className="text-xs">{qty} × KES {product.price}</div>
                    </div>
                    <span style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-bold"><Price v={product.price * qty} /></span>
                  </div>
                </RevealUp>
              ))}
            </div>
            <RevealUp delay={150}>
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(235, 239, 228, 0.8)', border: `1px solid ${C.line}` }}>
                <div className="flex items-center gap-2 mb-2"><MapPin size={14} color={C.accent} /><span style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-semibold">Delivery details</span></div>
                <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-xs leading-relaxed">Estimated delivery today between 4:00–6:00pm. You'll get a WhatsApp update once your rider is on the way.</p>
              </div>
            </RevealUp>
          </div>
          <RevealUp delay={120}>
            <div className="p-6 h-fit rounded-2xl" style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${C.line}` }}>
              <h3 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-base font-bold mb-5">Order summary</h3>
              <div className="flex justify-between text-sm mb-2" style={{ color: C.inkDim, fontFamily: BODY }}><span>Subtotal</span><span><Price v={subtotal} /></span></div>
              <div className="flex justify-between text-sm mb-4" style={{ color: C.inkDim, fontFamily: BODY }}><span>Delivery</span><span><Price v={deliveryFee} /></span></div>
              <div className="flex justify-between text-base mb-6 pt-4" style={{ color: C.ink, fontFamily: DISPLAY, fontWeight: 700, borderTop: `1px solid ${C.line}` }}><span>Total</span><span><Price v={subtotal + deliveryFee} /></span></div>
              <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 rounded-xl" style={{ background: C.accent, color: "#fff" }}>
                Confirm on WhatsApp <ArrowRight size={15} />
              </a>
            </div>
          </RevealUp>
        </div>
      )}
    </div>
  );
}

/* ---------------- WISHLIST ---------------- */
function Wishlist({ openProduct, onNavigate }) {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
      <RevealUp>
        <Eyebrow>Saved</Eyebrow>
        <h1 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl font-extrabold mb-10">Your wishlist</h1>
      </RevealUp>
      {items.length === 0 ? (
        <RevealUp delay={100}>
          <div className="text-center py-16">
            <Heart size={30} color={C.inkFaint} className="mx-auto mb-4" />
            <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm mb-5">Nothing saved yet.</p>
            <button onClick={() => onNavigate("shop")} className="btn-primary px-6 py-3 text-sm font-semibold rounded-xl" style={{ background: C.accent, color: "#fff" }}>Browse groceries</button>
          </div>
        </RevealUp>
      ) : (
        <RevealStagger delay={0} stagger={60}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
            {items.map((p) => <ProductCard p={p} key={p.id} onOpen={openProduct} />)}
          </div>
        </RevealStagger>
      )}
    </div>
  );
}

/* ---------------- ACCOUNT ---------------- */
function Account() {
  return (
    <div className="max-w-md mx-auto px-5 sm:px-8 py-20">
      <RevealScale>
        <div className="rounded-2xl p-8 sm:p-10 text-center" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <User size={30} color={C.inkFaint} className="mx-auto mb-4" />
          <h1 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-2xl font-extrabold mb-2">Your account</h1>
          <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm mb-7">Order through WhatsApp and we'll keep a running record tied to your number — no password to remember.</p>
          <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="btn-primary inline-block px-6 py-3 text-sm font-semibold rounded-xl" style={{ background: C.accent, color: "#fff" }}>Message us to get started</a>
        </div>
      </RevealScale>
    </div>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkMotion = () => setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    checkMobile();
    checkMotion();
    window.addEventListener('resize', checkMobile);
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkMotion);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', checkMotion);
    };
  }, []);

  const editorialLayout = isMobile ? GALLERY_IMAGES.map((img) => ({ ...img, span: 1 })) : [
    { ...GALLERY_IMAGES[0], span: 2, row: 0, rotate: -1 },
    { ...GALLERY_IMAGES[1], span: 1, row: 0, rotate: 0.5 },
    { ...GALLERY_IMAGES[2], span: 1, row: 0, rotate: -0.3 },
    { ...GALLERY_IMAGES[3], span: 1, row: 1, rotate: 0.8 },
    { ...GALLERY_IMAGES[4], span: 2, row: 1, rotate: -0.5 },
    { ...GALLERY_IMAGES[5], span: 1, row: 2, rotate: 0.3 },
    { ...GALLERY_IMAGES[6], span: 1, row: 2, rotate: -0.7 },
    { ...GALLERY_IMAGES[7], span: 1, row: 2, rotate: 0.4 },
    { ...GALLERY_IMAGES[8], span: 1, row: 3, rotate: -0.4 },
    { ...GALLERY_IMAGES[9], span: 1, row: 3, rotate: 0.6 },
    { ...GALLERY_IMAGES[10], span: 1, row: 3, rotate: -0.2 },
    { ...GALLERY_IMAGES[11], span: 1, row: 3, rotate: 0.3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
      <RevealUp>
        <Eyebrow>Gallery</Eyebrow>
        <h1 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl sm:text-4xl font-extrabold mb-4">Fresh moments</h1>
        <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm mb-10 max-w-xl">A glimpse into our market, our produce, and the people who bring it to your door.</p>
      </RevealUp>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
        {editorialLayout.map((img) => {
          const colSpan = img.span === 2 ? 'lg:col-span-2' : '';
          const rowSpan = img.span === 2 ? 'lg:row-span-2' : '';
          const rotate = prefersReducedMotion ? 0 : img.rotate;

          return (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 + (img.row || 0) * 10, rotateX: 3 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.7,
                delay: (img.id % 4) * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`${colSpan} ${rowSpan} group relative overflow-hidden rounded-2xl cursor-pointer`}
              style={{
                transform: `rotate(${rotate}deg)`,
                transition: 'transform 0.5s cubic-bezier(.2,.7,.3,1), box-shadow 0.5s ease',
              }}
              whileHover={prefersReducedMotion ? {} : { y: -8, rotate: 0, scale: 1.02 }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
                style={{ transition: 'transform 0.6s cubic-bezier(.2,.7,.3,1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span style={{ fontFamily: DISPLAY }} className="text-white text-sm sm:text-base font-semibold drop-shadow-md">{img.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About({ onNavigate }) {
  const values = [
    { title: "Freshness first", desc: "We source directly from farmers and markets every morning so your basket arrives at peak quality.", icon: ShieldCheck },
    { title: "Community driven", desc: "From Nairobi to Kisumu, we support local growers and small businesses across Kenya.", icon: MapPin },
    { title: "Sustainable choices", desc: "Eco-friendly packaging, reduced food waste, and responsible sourcing in everything we do.", icon: Check },
    { title: "Speed with care", desc: "Same-day delivery without cutting corners — because great groceries deserve great logistics.", icon: Truck },
  ];
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
      <RevealUp>
        <div className="text-center mb-14">
          <Eyebrow>About us</Eyebrow>
          <h1 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-3xl sm:text-4xl font-extrabold mb-4">We believe groceries should feel human.</h1>
          <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-base leading-relaxed max-w-2xl mx-auto">Beyond Fruits Market started with a simple idea: make fresh, quality groceries accessible to everyone — without the hassle, without the markup, and without compromising on what matters.</p>
        </div>
      </RevealUp>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {values.map((v, i) => (
          <RevealScale key={v.title} delay={i * 100}>
            <div className="h-full p-6 sm:p-8 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <v.icon size={24} color={C.accent} strokeWidth={1.6} />
              <h3 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-base font-bold mt-4 mb-2">{v.title}</h3>
              <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm leading-relaxed">{v.desc}</p>
            </div>
          </RevealScale>
        ))}
      </div>

      <RevealUp>
        <div className="p-8 sm:p-12 text-center rounded-2xl" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <h2 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-2xl sm:text-3xl font-extrabold mb-4">Our promise</h2>
          <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-base leading-relaxed max-w-2xl mx-auto mb-6">Every order is packed by hand, every delivery is tracked with care, and every product is chosen with your kitchen in mind. If it isn't fresh, we won't send it — and if something goes wrong, we'll make it right.</p>
          <button onClick={() => onNavigate("shop")} className="btn-primary px-8 py-3.5 text-sm font-semibold rounded-xl" style={{ background: C.accent, color: "#fff" }}>Start shopping</button>
        </div>
      </RevealUp>
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ onNavigate }) {
  const go = useCallback((p) => { onNavigate(p); }, [onNavigate]);
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, background: C.bgAlt }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <Logo size="sm" variant="full" className="mb-4" />
          <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm mb-5 max-w-xs">Fresh groceries. Better everyday.</p>
          <div className="p-5 rounded-2xl" style={{ background: C.card, border: `1px solid ${C.line}` }}>
            <h4 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-bold mb-2">Join our newsletter</h4>
            <p style={{ color: C.inkDim, fontFamily: BODY }} className="text-xs mb-3">Get weekly deals and fresh picks delivered to your inbox.</p>
            <div className="flex gap-2">
              <input placeholder="Your email" className="flex-1 px-3 py-2.5 text-sm outline-none rounded-xl" style={{ background: C.bg, border: `1px solid ${C.line}`, color: C.ink, fontFamily: BODY }} />
              <button className="btn-primary px-4 py-2.5 text-sm font-semibold rounded-xl" style={{ background: C.accent, color: "#fff" }}>Join</button>
            </div>
          </div>
        </div>
        {[
          ["Shop", ["All groceries", "Weekly deals", "Categories"]],
          ["Discover", ["Gallery", "About us"]],
          ["Support", ["Delivery info", "Track order", "Returns"]],
        ].map(([h, items]) => (
          <div key={h}>
            <h4 style={{ fontFamily: DISPLAY, color: C.ink }} className="text-sm font-bold mb-4">{h}</h4>
            <ul className="space-y-2.5">
              {items.map((it) => {
                const target = it.toLowerCase().replace(/\s+/g, "");
                const page = target === "gallery" ? "gallery" : target === "aboutus" ? "about" : "shop";
                return (
                  <li key={it}><button onClick={() => go(page)} style={{ color: C.inkDim, fontFamily: BODY }} className="text-sm transition-colors hover:text-current">{it}</button></li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t" style={{ borderColor: C.line }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2">
          <span style={{ color: C.inkFaint, fontFamily: BODY }} className="text-xs">© 2026 Beyond Fruits Market. Fresh groceries. Better everyday.</span>
          <span style={{ color: C.inkFaint, fontFamily: BODY }} className="text-xs">Nairobi · Mombasa · Kisumu · Eldoret</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  const [page, setPage] = useState("home");
  const [pageKey, setPageKey] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useCallback((p) => {
    setPage(p);
    setPageKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openProduct = useCallback((p) => {
    setSelectedProduct(p);
    navigate("product");
  }, [navigate]);

  return (
    <StoreProvider>
      <div style={{ background: C.bg, minHeight: "100vh" }}>
        <style>{`
          ${FONT_IMPORT}
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { margin: 0; }
          ::selection { background: ${C.accent}; color: #fff; }
          select:focus, input:focus { outline: none; }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            html { scroll-behavior: auto; }
          }

          @keyframes floatSlow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-12px) rotate(1deg); }
            66% { transform: translateY(8px) rotate(-1deg); }
          }
          @keyframes floatSlowAlt {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-8px) rotate(-1deg); }
            66% { transform: translateY(10px) rotate(1deg); }
          }
          @keyframes scrollDown {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(8px); opacity: 0.4; }
          }

          .btn-primary {
            transition: transform 0.2s ease, box-shadow 0.25s ease, filter 0.2s ease, background-color 0.3s ease;
          }
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px -6px rgba(62, 93, 52, 0.35);
            filter: brightness(1.06);
          }
          .btn-primary:active {
            transform: translateY(0) scale(0.97);
          }
        `}</style>

        <Header onNavigate={navigate} openCart={() => setCartOpen(true)} openSearch={searchOpen} setOpenSearch={setSearchOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <motion.div
          key={pageKey}
          initial={{ opacity: 0, y: 8, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {page === "home" && <Home openProduct={openProduct} onNavigate={navigate} />}
          {page === "shop" && <Shop openProduct={openProduct} searchQuery={searchQuery} />}
          {page === "product" && <ProductDetail product={selectedProduct} openProduct={openProduct} />}
          {page === "checkout" && <Checkout onNavigate={navigate} />}
          {page === "wishlist" && <Wishlist openProduct={openProduct} onNavigate={navigate} />}
          {page === "gallery" && <Gallery />}
          {page === "about" && <About onNavigate={navigate} />}
          {page === "account" && <Account />}
        </motion.div>

        <Footer onNavigate={navigate} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onNavigate={navigate} />
      </div>
    </StoreProvider>
  );
}
