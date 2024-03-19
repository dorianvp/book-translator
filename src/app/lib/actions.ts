'use server'
import { ItemType, MenuData, Product } from '@/types/types'
import { sql } from '@vercel/postgres'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt, encrypt } from './encryption'

export async function authenticate(prevState: any, formData: FormData) {
	try {
		const password = formData.get('password') as string
		const user = await sql`SELECT * FROM public."User" WHERE passphrase = ${password}`
		if (user.rowCount > 0) {
			cookies().set('pp', encrypt(password), {
				httpOnly: true,
				secure: true,
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'strict'
			})
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
		throw error
	}
	redirect('/admin')
}

export async function isAuthenticated() {
	try {
		const password = decrypt(cookies().get('pp')?.value as string);

		const user = await sql`SELECT * FROM public."User" WHERE passphrase = ${password}`

		if (user.rowCount === 0) {
			return false
		}
	} catch (error) {
		console.log(error);
		throw error
	}
	redirect('/admin')
}

export async function updateProducts(items: MenuData) {
	if (!validateProducts(items)) throw Error("Invalid product")
	items.forEach(async (item, i) => {
		console.log(item);

		if (item.type == ItemType.Product) {
			await sql`INSERT INTO public."Product" (id, title, description, price, "order") 
			VALUES (${item.id}, ${item.title}, ${item.title}, ${item.price}, ${i++}) 
			ON CONFLICT (id) DO 
			UPDATE SET title = ${item.title}, description = ${item.description}, price = ${item.price}, "order" = ${i++}`
				.catch(err => {
					console.log(err);
				})
		}
	})
	return
}

function validateProducts(items: MenuData): boolean {
	try {
		items.forEach(item => {
			if (!item.title) throw new Error("Missing title for item");
		})
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}