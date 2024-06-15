import React from 'react'
import { userStore } from '../store/userStore'
import { useQuery } from '@tanstack/react-query'
import { retrieveData } from '../utils/utils'

export default function Subscription() {
    const token = userStore((state: any) => state.token)
    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['main_page_subscription'],
        queryFn: () => retrieveData(`subscription`, header),
    })
    
  return (
    <div>Subscription</div>
  )
}
