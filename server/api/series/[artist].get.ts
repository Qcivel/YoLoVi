import type { RowDataPacket } from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const artist = getRouterParam(event, 'artist')

    if (!artist) {
        throw createError({ statusCode: 400, statusMessage: 'Artiste manquant' })
    }

    const db = useDb()

    const [seriesRows] = await db.query<RowDataPacket[]>(
        `SELECT s.Id_Series, s.title_series, s.description_series, st.name_status
        FROM Series s
        JOIN \`User\` u ON u.Id_User = s.Id_User
        JOIN status st ON st.Id_status = s.Id_status
        WHERE u.login_user = ?
        ORDER BY s.Id_Series`,
    [artist]
    )

    const series = []
    for (const s of seriesRows) {
        const [pictureRows] = await db.query<RowDataPacket[]>(
        `SELECT title_picture, url_picture, description_picture
        FROM Picture
        WHERE Id_Series = ?
        ORDER BY Id_Picture`,
        [s.Id_Series]
        )
        series.push({
            id: s.Id_Series,
            name: s.title_series,
            description: s.description_series,
            status: s.name_status,
            slides: pictureRows.map(p => ({
                src: p.url_picture,
                alt: p.description_picture ?? p.title_picture,
            })),
        })
    }
    return series
})  