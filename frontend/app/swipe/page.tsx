"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { X, Heart, Sparkles, AlertCircle, ShoppingBag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Seller {
  id: string;
  name?: string;
  username?: string;
  avatarUrl?: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  seller: Seller;
  images?: { url: string }[];
}

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Sony WH-1000XM4 Headphones",
    description: "Barely used, bought them last semester but prefer earbuds. Comes with original case. Can meet up at the library.",
    price: 150,
    category: "ACCESSORIES",
    seller: { id: "s1", name: "Alex Johnson", avatarUrl: "https://i.pravatar.cc/150?img=11" },
    images: [{ url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80" }]
  },
  {
    id: "2",
    title: "Calculus Early Transcendentals",
    description: "Required for MATH 180/181. Good condition, no highlighting or missing pages.",
    price: 45,
    category: "SCHOOL",
    seller: { id: "s2", name: "Maria Garcia", avatarUrl: "https://i.pravatar.cc/150?img=5" },
    images: [{ url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80" }]
  },
  {
    id: "3",
    title: "Dorm Mini Fridge",
    description: "Moving out of JST and can't take this with me. Works perfectly, gets really cold. Pick up only.",
    price: 60,
    category: "HOUSING",
    seller: { id: "s3", name: "David Kim", avatarUrl: "https://i.pravatar.cc/150?img=60" },
    images: [{ url: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80" }]
  },
  {
    id: "4",
    title: "Vintage UIC Hoodie",
    description: "Size Large. Super comfortable and thick material. Vintage design you can't find in the bookstore anymore.",
    price: 25,
    category: "CLOTHES",
    seller: { id: "s4", name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?img=47" },
    images: [{ url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" }]
  }
];

export default function SwipePage() {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const activeListing = listings[0];
  const nextListing = listings[1];

  // Motion values for the drag effect
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  // Opacity for the "LIKE" and "NOPE" stamps based on drag offset
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleSwipe = (direction: "left" | "right") => {
    // Optimistically remove the top card
    setListings((prev) => prev.slice(1));
    
    // In a real implementation, make API call here
    console.log(`Swiped ${direction} on ${activeListing?.title}`);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      handleSwipe("right");
    } else if (offset < -100 || velocity < -500) {
      handleSwipe("left");
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-zinc-50 font-sans">
      
      {/* Title / Header */}
      <div className="absolute top-8 text-center z-20">
        <h1 className="text-2xl font-black text-black tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-[#3252DF]" />
          Match Your Needs
        </h1>
        <p className="text-sm font-medium text-zinc-500 mt-1">Swipe right to save to your wishlist</p>
      </div>

      <div className="relative h-[600px] w-full max-w-[400px] mt-8 flex items-center justify-center">
        <AnimatePresence>
          {activeListing ? (
            <>
              {/* NEXT CARD (Background) */}
              {nextListing && (
                <motion.div
                  key={nextListing.id}
                  className="absolute inset-0 z-0 flex flex-col overflow-hidden rounded-3xl bg-white shadow-md border border-zinc-200"
                  initial={{ scale: 0.9, y: 20, opacity: 0.8 }}
                  animate={{ scale: 0.95, y: 10, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative flex-1 bg-zinc-100">
                    <img 
                      src={nextListing.images?.[0]?.url || "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80"} 
                      alt="" 
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 bg-white flex flex-col justify-end h-[40%]">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-black text-black truncate pr-2">{nextListing.title}</h2>
                      <span className="text-2xl font-black text-[#3252DF]">${nextListing.price}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ACTIVE CARD (Foreground) */}
              <motion.div
                key={activeListing.id}
                className="absolute inset-0 z-10 flex cursor-grab active:cursor-grabbing flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-zinc-200/60"
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.02 }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ 
                  x: x.get() > 0 ? 300 : -300, 
                  opacity: 0, 
                  transition: { duration: 0.3 } 
                }}
              >
                {/* LIKE STAMP */}
                <motion.div 
                  style={{ opacity: likeOpacity }}
                  className="absolute top-12 left-8 z-30 pointer-events-none"
                >
                  <div className="border-4 border-emerald-500 text-emerald-500 font-black text-4xl py-1 px-4 rounded-xl -rotate-12 uppercase tracking-widest bg-white/10 backdrop-blur-sm">
                    LIKE
                  </div>
                </motion.div>

                {/* NOPE STAMP */}
                <motion.div 
                  style={{ opacity: nopeOpacity }}
                  className="absolute top-12 right-8 z-30 pointer-events-none"
                >
                  <div className="border-4 border-rose-500 text-rose-500 font-black text-4xl py-1 px-4 rounded-xl rotate-12 uppercase tracking-widest bg-white/10 backdrop-blur-sm">
                    NOPE
                  </div>
                </motion.div>

                {/* Card Image */}
                <div className="relative flex-1 bg-zinc-100 overflow-hidden">
                  {activeListing.images && activeListing.images.length > 0 ? (
                    <img 
                      src={activeListing.images[0].url} 
                      alt={activeListing.title}
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-200">
                      <ShoppingBag className="h-24 w-24 text-zinc-300" />
                    </div>
                  )}
                  
                  {/* Category Badge overlaying the image */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-md text-black border-transparent font-bold px-3 py-1 text-xs shadow-sm uppercase tracking-wider">
                      {activeListing.category}
                    </Badge>
                  </div>
                  
                  {/* Bottom gradient so text is readable if image is bright */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
                </div>
                
                {/* Card Details */}
                <div className="p-6 bg-white relative z-20 border-t border-zinc-100">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h2 className="text-2xl font-black text-black leading-tight">{activeListing.title}</h2>
                    <span className="text-2xl font-black text-[#3252DF] shrink-0">${activeListing.price}</span>
                  </div>
                  
                  <p className="text-sm font-medium text-zinc-600 line-clamp-3 mb-5 leading-relaxed">
                    {activeListing.description}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                    <Avatar className="h-10 w-10 border border-zinc-200 shadow-sm">
                      <AvatarImage src={activeListing.seller?.avatarUrl} />
                      <AvatarFallback className="bg-zinc-100 font-bold text-zinc-600">
                        {activeListing.seller?.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-black">{activeListing.seller?.name || "Anonymous Seller"}</span>
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-wider">
                        <MapPin className="h-3 w-3" /> UIC Verified
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-300 bg-white shadow-sm p-8 text-center"
            >
              <div className="rounded-full bg-zinc-100 p-6 mb-5">
                <AlertCircle className="h-12 w-12 text-zinc-400" />
              </div>
              <h3 className="text-2xl font-black text-black tracking-tight mb-2">You're all caught up!</h3>
              <p className="text-zinc-500 font-medium">Check back later for more listings from the UIC community.</p>
              <Button 
                variant="outline" 
                className="mt-6 font-bold rounded-full border-zinc-200"
                onClick={() => setListings(MOCK_LISTINGS)}
              >
                Restart Demo
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-center gap-6 z-20">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleSwipe("left")}
            disabled={!activeListing}
            className="h-16 w-16 rounded-full border-2 border-rose-200 text-rose-500 bg-white hover:bg-rose-50 hover:text-rose-600 shadow-xl shadow-rose-500/10 transition-colors"
          >
            <X className="h-7 w-7 stroke-[3]" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleSwipe("right")}
            disabled={!activeListing}
            className="h-16 w-16 rounded-full border-2 border-emerald-200 text-emerald-500 bg-white hover:bg-emerald-50 hover:text-emerald-600 shadow-xl shadow-emerald-500/10 transition-colors"
          >
            <Heart className="h-7 w-7 stroke-[3] fill-emerald-500/20" />
          </Button>
        </motion.div>
      </div>

    </div>
  );
}
