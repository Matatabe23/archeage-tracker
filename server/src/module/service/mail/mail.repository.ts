import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailRepository {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT), // важно: порт должен быть числом
			secure: process.env.MAIL_SECURE === 'true', // строку "true" конвертируем в boolean
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD
			}
		});
	}

	async sendMail(values: {
		from?: string;
		to: string;
		subject: string;
		html?: string;
		text?: string;
	}): Promise<void> {
		try {
			await this.transporter.sendMail({
				from: values.from || process.env.MAIL_USER, // от кого
				to: values.to, // кому
				subject: values.subject, // тема
				text: values.text || '', // текст (если нужен)
				html: values.html // HTML-контент
			});

			console.log(`Письмо успешно отправлено на ${values.to}`);
		} catch (error) {
			console.error(`Ошибка отправки письма:`, error);
			throw new Error('Не удалось отправить письмо');
		}
	}
}
