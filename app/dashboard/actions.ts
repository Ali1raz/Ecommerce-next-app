'use server'

import {prisma} from "@/lib/prisma";
import {formatDate} from "@/utils";

export async function getStats () {
    try {
        const products = await productsPerDay();

        const categories = await prisma.category.findMany({
            select: {
                id: true, name: true,
                _count: {select: {products: true}}
            },
        })

        const users = await usersPerDay();

        return {success: true, data: {products, users, categories}}
    } catch (e) {
        return {success: false, data: e}
    }
}

async function productsPerDay() {
    const pg = await prisma.product.groupBy({
        by: ['created_at'], _count: {id: true},
        orderBy: {created_at: 'asc'}
    })
    const allDates = [];
    const currentDate = new Date('2025-02-10T12:08:33.210Z');
    const today = new Date();
    while (currentDate <= today) {
        allDates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate()+1);
    }

    const productsCount = allDates.reduce((acc, current) => {
        acc[current] = 0;
        return acc;
    }, {} as Record<string, number>);

    pg.forEach(({ created_at, _count }) => {
        const date = formatDate(created_at);
        productsCount[date] = (productsCount[date] || 0) + _count.id;
    });

    return productsCount;
}

async function usersPerDay() {
    const pg = await prisma.user.groupBy({
        by: ['created_at'],
        _count: {id: true},
        orderBy: {created_at: 'asc'}
    })

    const allDates = [];
    const currentDate = new Date('2025-02-10T12:08:33.210Z');
    const today = new Date();
    while (currentDate <= today) {
        allDates.push(formatDate(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate()+1);
    }
    const usersCount = allDates.reduce((acc, current) => {
        acc[current] = 0;
        return acc;
    }, {} as Record<string, number>);

    pg.forEach(({ created_at, _count }) => {
        const date = formatDate(created_at);
        usersCount[date] = (usersCount[date] || 0) + _count.id;
    })
    return usersCount;
}