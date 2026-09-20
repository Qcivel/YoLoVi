import { useDb } from '../utils/db'
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'

interface InsertPictureInput {
  title: string
  url: string
  seriesId: number
  description: string
}

export class Picture {
  id: number
  title: string
  url: string
  description: string

  constructor(id: number, title: string, url: string, description: string) {
    this.id = id
    this.title = title
    this.url = url
    this.description = description
  }

  static async insertPicture({ title, url, seriesId, description }: InsertPictureInput): Promise<number> {
    const db = useDb()
    const [descResult] = await db.query<ResultSetHeader>(
      'INSERT INTO description (content_description) VALUES (?)',
      [description]
    )
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO Picture (title_picture, url_picture, Id_Series, Id_description) VALUES (?, ?, ?, ?)',
      [title, url, seriesId, descResult.insertId]
    )
    return result.insertId
  }

  static async findRowsBySeriesId(seriesId: number): Promise<RowDataPacket[]> {
    const db = useDb()
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT p.Id_Picture, p.title_picture, p.url_picture, d.content_description
       FROM Picture p JOIN description d ON d.Id_description = p.Id_description
       WHERE p.Id_Series = ?
       ORDER BY p.Id_Picture`,
      [seriesId]
    )
    return rows
  }

  async delete(): Promise<void> {
    const db = useDb()
    await db.query('DELETE FROM Picture WHERE Id_Picture = ?', [this.id])
  }

  toJSON() {
    return { src: this.url, alt: this.description }
  }
}