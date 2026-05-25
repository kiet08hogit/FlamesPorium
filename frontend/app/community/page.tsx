"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  MapPin, 
  Calendar, 
  Search, 
  PlusCircle, 
  ArrowUp, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Flame,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Temporary Mock Data for UI
type PostType = "DISCUSSION" | "EVENT" | "CHECK_IN" | "LOOKING_FOR";

interface MockPost {
  id: string;
  title: string;
  content: string;
  type: PostType;
  author: {
    name: string;
    username: string;
    avatarUrl?: string;
    verified: boolean;
  };
  createdAt: string;
  upvotes: number;
  comments: number;
}

const MOCK_POSTS: MockPost[] = [
  {
    id: "1",
    title: "Has anyone taken CS 474 with Prof. xyz?",
    content: "I'm planning my schedule for next semester and wanted to know if this class is extremely project heavy or more exam focused? Also wondering if anyone has the syllabus.",
    type: "DISCUSSION",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      verified: true
    },
    createdAt: "2h ago",
    upvotes: 42,
    comments: 15,
  },
  {
    id: "2",
    title: "Hosting a huge dorm moving sale this weekend at ARC!",
    content: "Graduating this semester and I have a ton of furniture, mini-fridge, and monitors to sell. I'll be in the ARC lobby this Saturday from 12 PM - 4 PM. DM me if you're looking for anything specific!",
    type: "EVENT",
    author: {
      name: "Sarah Chen",
      username: "schen99",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
      verified: true
    },
    createdAt: "5h ago",
    upvotes: 89,
    comments: 24,
  },
  {
    id: "3",
    title: "Studying at SCE right now, come say hi!",
    content: "Grinding out the last bit of the semester. Sitting near the inner circle by the dunkin. If anyone needs a study buddy or wants to take a break and chat about side projects, pull up!",
    type: "CHECK_IN",
    author: {
      name: "David Kim",
      username: "dkim_dev",
      avatarUrl: "https://i.pravatar.cc/150?img=11",
      verified: true
    },
    createdAt: "15m ago",
    upvotes: 12,
    comments: 3,
  },
  {
    id: "4",
    title: "ISO: iClicker for chemistry",
    content: "Does anyone have a spare iClicker they don't need anymore? Willing to pay $20. Can meet up anywhere on east campus today.",
    type: "LOOKING_FOR",
    author: {
      name: "Emily R.",
      username: "emily_r",
      verified: true
    },
    createdAt: "1d ago",
    upvotes: 5,
    comments: 2,
  }
];

const POST_TYPE_CONFIG = {
  DISCUSSION: { label: "Discussion", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  EVENT: { label: "Event", icon: Calendar, color: "text-rose-600", bg: "bg-rose-50 border-rose-200" },
  CHECK_IN: { label: "Check In", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  LOOKING_FOR: { label: "Looking For", icon: Search, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
};

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState<PostType | "ALL">("ALL");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const filteredPosts = activeFilter === "ALL" 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.type === activeFilter);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50/50 py-8 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header & Create Post Inline */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm">
            <div className="flex gap-4 items-center">
              <Avatar className="h-10 w-10 border border-zinc-200 shrink-0">
                <AvatarFallback className="bg-zinc-100 font-bold text-zinc-600">ME</AvatarFallback>
              </Avatar>
              <div 
                className="flex-1 bg-zinc-100 hover:bg-zinc-200/80 transition-colors h-12 rounded-full px-5 flex items-center cursor-text text-zinc-500 font-medium"
                onClick={() => setIsCreatingPost(!isCreatingPost)}
              >
                What's happening on campus?
              </div>
              <Button 
                onClick={() => setIsCreatingPost(!isCreatingPost)}
                className="shrink-0 rounded-full h-12 w-12 p-0 bg-[#3252DF] hover:bg-[#2842B3] text-white shadow-sm"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
            
            <AnimatePresence>
              {isCreatingPost && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-zinc-100">
                    <Input 
                      placeholder="Title of your post" 
                      className="mb-3 font-bold text-lg border-transparent px-2 shadow-none focus-visible:ring-0 bg-transparent placeholder:text-zinc-400"
                    />
                    <textarea 
                      placeholder="Share details, location, or what you're looking for..." 
                      className="w-full min-h-[100px] resize-none outline-none px-2 py-1 text-zinc-700 bg-transparent"
                    />
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-full h-8 text-xs font-bold border-zinc-200">
                          <ImageIcon className="h-3.5 w-3.5 mr-1.5" /> Media
                        </Button>
                        <select className="h-8 rounded-full border border-zinc-200 text-xs font-bold px-3 bg-white outline-none">
                          <option>Discussion</option>
                          <option>Event</option>
                          <option>Check In</option>
                          <option>Looking For</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsCreatingPost(false)}>Cancel</Button>
                        <Button size="sm" className="rounded-full bg-[#3252DF] hover:bg-[#2842B3] text-white font-bold px-6">
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={activeFilter === "ALL" ? "default" : "outline"}
              onClick={() => setActiveFilter("ALL")}
              className={`rounded-full h-9 font-bold text-xs ${
                activeFilter === "ALL" 
                  ? "bg-zinc-900 text-white hover:bg-black" 
                  : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <Flame className={`h-3.5 w-3.5 mr-1.5 ${activeFilter === "ALL" ? "text-orange-500" : ""}`} />
              Hot
            </Button>
            
            {Object.entries(POST_TYPE_CONFIG).map(([key, config]) => (
              <Button
                key={key}
                variant={activeFilter === key ? "default" : "outline"}
                onClick={() => setActiveFilter(key as PostType)}
                className={`rounded-full h-9 font-bold text-xs border transition-colors ${
                  activeFilter === key 
                    ? `${config.bg} ${config.color} hover:${config.bg}` 
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                <config.icon className={`h-3.5 w-3.5 mr-1.5 ${activeFilter === key ? config.color : ""}`} />
                {config.label}
              </Button>
            ))}
          </div>

          {/* Feed */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => {
                const config = POST_TYPE_CONFIG[post.type];
                
                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl border border-zinc-200 p-0 shadow-sm overflow-hidden hover:border-zinc-300 transition-colors cursor-pointer"
                  >
                    <div className="p-5 flex gap-4">
                      
                      {/* Upvote Column (Reddit Style) */}
                      <div className="flex flex-col items-center gap-1 shrink-0 bg-zinc-50/50 rounded-full py-2 px-1">
                        <button className="text-zinc-400 hover:text-orange-500 hover:bg-orange-50 p-1 rounded-full transition-colors">
                          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
                        </button>
                        <span className="text-xs font-black text-zinc-700 py-1">{post.upvotes}</span>
                        <button className="text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 p-1 rounded-full transition-colors rotate-180">
                          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Content Column */}
                      <div className="flex-1 min-w-0">
                        {/* Meta */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-xs">
                            <Badge variant="outline" className={`${config.bg} ${config.color} rounded-md font-bold text-[10px] uppercase tracking-wider px-2 border`}>
                              <config.icon className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>
                            <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                              • Posted by
                              <div className="flex items-center gap-1 text-black font-bold hover:underline">
                                {post.author.avatarUrl && (
                                  <img src={post.author.avatarUrl} alt="" className="h-4 w-4 rounded-full" />
                                )}
                                {post.author.name}
                                {post.author.verified && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                              </div>
                              • {post.createdAt}
                            </span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 -mr-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Body */}
                        <h2 className="text-lg font-bold text-black mb-1.5 leading-snug">{post.title}</h2>
                        <p className="text-sm text-zinc-600 leading-relaxed mb-4">{post.content}</p>
                        
                        {/* Action Bar */}
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-zinc-500 font-bold text-xs hover:bg-zinc-100 rounded-full h-8">
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            {post.comments} Comments
                          </Button>
                          <Button variant="ghost" size="sm" className="text-zinc-500 font-bold text-xs hover:bg-zinc-100 rounded-full h-8">
                            <Share2 className="h-4 w-4 mr-1.5" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                <Search className="h-10 w-10 mx-auto text-zinc-300 mb-3" />
                <p className="font-bold">No posts found for this filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <h3 className="font-black text-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              Trending on Campus
            </h3>
            <div className="space-y-4">
              {[
                { title: "Best places to study after midnight?", comments: 34 },
                { title: "HackUIC registration is open!", comments: 12 },
                { title: "Looking for a roommate (Spring 2027)", comments: 8 }
              ].map((trend, i) => (
                <div key={i} className="group cursor-pointer">
                  <h4 className="font-bold text-sm text-zinc-800 group-hover:text-[#3252DF] transition-colors leading-tight mb-1">
                    {trend.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium">{trend.comments} comments</p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button variant="outline" className="w-full rounded-full font-bold text-xs border-zinc-200">
              View All Trends
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-[#3252DF] to-[#b81d68] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-white/10 rounded-full blur-xl" />
            <h3 className="font-black text-lg mb-2 relative z-10">Host an Event</h3>
            <p className="text-sm text-white/90 mb-4 relative z-10">Selling your dorm stuff? Hosting a study group? Share it with the community!</p>
            <Button className="w-full bg-white text-black hover:bg-zinc-100 rounded-full font-bold relative z-10" onClick={() => setIsCreatingPost(true)}>
              Create Event Post
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
