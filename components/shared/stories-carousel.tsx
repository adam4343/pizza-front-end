"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Container } from "../common/container";
import { Title } from "./title";

const stories = [
  {
    id: 1,
    thumbnail: "/poster-1.jpg",
    fullImage: "/poster-1.jpg",
    title: "Dodo have an app",
    bgColor: "bg-gradient-to-br from-orange-300 to-pink-300",
  },
  {
    id: 2,
    thumbnail: "/poster-2.jpg",
    fullImage: "/poster-2.jpg",
    title: "Easy choice, make it",
    bgColor: "bg-gradient-to-br from-red-300 to-blue-300",
  },
  {
    id: 3,
    thumbnail: "/poster-3.jpg",
    fullImage: "/poster-3.jpg",
    title: "Crispy nuggets, yummy",
    bgColor: "bg-gradient-to-br from-orange-300 to-amber-200",
  },
  {
    id: 4,
    thumbnail: "/poster-4.jpg",
    fullImage: "/poster-4.jpg",
    title: "Super saver deal",
    bgColor: "bg-gradient-to-br from-amber-100 to-orange-400",
  },
  {
    id: 5,
    thumbnail: "/poster-5.jpg",
    fullImage: "/poster-5.jpg",
    title: "Download for free pizza!",
    bgColor: "bg-gradient-to-br from-purple-300 to-violet-300",
  },
  {
    id: 6,
    thumbnail: "/poster-6.jpg",
    fullImage: "/poster-6.jpg",
    title: "Free Delivery?",
    bgColor: "bg-gradient-to-br from-red-300 to-rose-200",
  },
];

export function StoriesCarousel() {
  const [openStory, setOpenStory] = useState<number | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextStory(),
    onSwipedRight: () => handlePrevStory(),
    trackMouse: true, 
  });

  const handleOpenStory = (id: number, index: number) => {
    setOpenStory(id);
    setCurrentStoryIndex(index);
  };

  const handleCloseStory = () => {
    setOpenStory(null);
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setOpenStory(stories[currentStoryIndex + 1].id);
    } else {
      handleCloseStory();
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setOpenStory(stories[currentStoryIndex - 1].id);
    }
  };

  return (
    <section className=" pt-6 lg:pt-10  md:px-10">
      <Container>
        <Title size="xl" className="text-2xl font-bold mb-6" text="Dodo Pizza" />

        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {stories.map((story, index) => (
              <CarouselItem
                key={story.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/7"
              >
                <div
                  className={cn(
                    "h-44 md:h-56 rounded-xl overflow-hidden flex flex-col items-center justify-center md:gap-3 cursor-pointer relative gap-2 pt-3",
                    story.bgColor
                  )}
                  onClick={() => handleOpenStory(story.id, index)}
                >
                    <Image
                      src={story.thumbnail || "/placeholder.svg"}
                      alt={story.title}
                      width={100}
                      height={100}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-cover rounded-sm"
                    />
                    <p className="text-sm lg:text-base text-white-color px-1 font-semibold text-center">
                      {story.title}
                    </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <Dialog open={openStory !== null} onOpenChange={handleCloseStory}>
          <DialogContent
            className={cn(
              "p-0 border-none bg-transparent shadow-none",
              "max-w-full max-h-full w-full h-full md:h-auto", 
              "md:w-[70vw] md:max-w-3xl md:max-h-[85vh]",
              "rounded-none md:rounded-lg"
            )}
          >
            <div
              {...swipeHandlers}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div
                className={cn(
                  "w-full h-full md:h-auto flex flex-col items-center justify-center relative",
                  "rounded-none md:rounded-lg",
                  stories[currentStoryIndex]?.bgColor
                )}
              >
                <div className="relative w-full h-full flex items-center justify-center pt-10 pb-16">
                  <Image
                    src={stories[currentStoryIndex]?.fullImage || ""}
                    alt={stories[currentStoryIndex]?.title || ""}
                    width={600}
                    height={600}
                    className="object-contain max-h-[75vh] max-w-full p-4 md:p-8"
                    priority
                  />
                </div>

                <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center">
                  <div className="flex space-x-1 w-full">
                    {stories.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "h-1 rounded-full flex-1 transition-all duration-300",
                          idx <= currentStoryIndex ? "bg-white-color" : "bg-white-color/30"
                        )}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white-color bg-black/30 hover:bg-black/50 rounded-full w-6 h-6 md:w-8 md:h-8 ml-4"
                    onClick={handleCloseStory}
                  >
                    <X className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white-color text-center bg-black/20">
                  <Title
                    size="lg"
                    text={stories[currentStoryIndex]?.title}
                    className="text-lg md:text-2xl font-bold"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 text-white-color bg-black/30 hover:bg-black/50 rounded-full w-8 h-8 md:w-10 md:h-10"
                onClick={handlePrevStory}
                disabled={currentStoryIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
                <span className="sr-only">Previous story</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 text-white-color bg-black/30 hover:bg-black/50 rounded-full w-8 h-8 md:w-10 md:h-10"
                onClick={handleNextStory}
                disabled={currentStoryIndex === stories.length - 1}
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
                <span className="sr-only">Next story</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </section>
  );
}