// src/hooks/useWishlist.js
import { atom, useAtom } from 'jotai';
import { useAuth } from './useAuth';
import { useEffect } from 'react';
import _ from 'lodash';
import { useToast } from './useToast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useWishlist = () => {
  const queryClient = useQueryClient()
  const {user} = useAuth()
  const toast = useToast();

  const {data: wishlist, isLoading: isWishListLoading, error: wishListError} = useQuery({
    queryKey:['wishList', user],
    queryFn: async () => {
      const data = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || []
      return data
    }
  })

  const wisiListMutaion = useMutation({
    mutationFn: async (data) => {
      localStorage.setItem(`wishlist_${user}`, JSON.stringify(data))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList', user] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const addToWishlist = (item) => {
    const data = [...wishlist, item]
    wisiListMutaion.mutate(data)
  }

  const removeFromWishlist = (item) => {
    const updatedWishlist = wishlist.filter(wishItem => wishItem.id !== item.id);
    wisiListMutaion.mutate(updatedWishlist);
  }


  return {
    wishlist,
    wishlist: _.uniqBy(wishlist, 'id'),
    isWishListLoading,
    wishListError,
    addToWishlist,
    removeFromWishlist,
  };
};
