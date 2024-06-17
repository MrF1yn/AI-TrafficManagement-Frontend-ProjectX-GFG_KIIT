import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type LaneData = [//Lane1, 2, 3, 4
  {
    car_count: number,
    fps: number,
    time: number,
    frame: string,
    stop: boolean
  },
  {
    car_count: number,
    fps: number,
    time: number,
    frame: string,
    stop: boolean
  },
  {
    car_count: number,
    fps: number,
    time: number,
    frame: string,
    stop: boolean
  },
  {
    car_count: number,
    fps: number,
    time: number,
    frame: string,
    stop: boolean
  }
]