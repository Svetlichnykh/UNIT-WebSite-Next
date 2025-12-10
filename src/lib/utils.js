import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function cardSlideAnimation() {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      x: -150,

    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    }
  };
  return cardVariants
}
export function cardSlideAnimationDelay() {
    return {
      offscreen: {
          opacity: 0,
          x: -150,

      },
      onscreen: {
          opacity: 1,
          x: 0,
          transition: {
              duration: 1,
              delay: 0.4
          },
      }
  }
}
export function cardSlideAnimationRight() {
    return {
      offscreen: {
          opacity: 0,
          x: 150,

      },
      onscreen: {
          opacity: 1,
          x: 0,
          transition: {
              duration: 1,
          },
      }
  }
}
export function cardSlideAnimationRightDelay() {
    return {
      offscreen: {
          opacity: 0,
          x: 150,

      },
      onscreen: {
          opacity: 1,
          x: 0,
          transition: {
              duration: 1,
              delay: 0.4
          },
      }
  }
}


export function countCartProductQuantity(products) {
  return products.reduce((total, product) => total + product?.quantity, 0)
}





