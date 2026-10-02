import { useDb } from '../utils/db'
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'

interface InsertPictureInput {
  title: string
  url: string
  seriesId: number
  description?: string | null
}

export class Picture {
  id: number
  title: string
  url: string
  description: string | null

  constructor(id: number, title: string, url: string, description: string | null) {
    this.id = id
    this.title = title
    this.url = url
    this.description = description
  }

  static async insertPicture({ title, url, seriesId, description }: InsertPictureInput): Promise<number> {
    const db = useDb()
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO Picture (title_picture, url_picture, description_picture, Id_Series) VALUES (?, ?, ?, ?)',
      [title, url, description ?? null, seriesId]
    )
    return result.insertId
  }

  static async findRowsBySeriesId(seriesId: number): Promise<RowDataPacket[]> {
    const db = useDb()
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT Id_Picture, title_picture, url_picture, description_picture
       FROM Picture
       WHERE Id_Series = ?
       ORDER BY Id_Picture`,
      [seriesId]
    )
    return rows
  }

  async delete(): Promise<void> {
    const db = useDb()
    await db.query('DELETE FROM Picture WHERE Id_Picture = ?', [this.id])
  }

  toJSON() {
    return { src: this.url, alt: this.description ?? this.title }
  }
}