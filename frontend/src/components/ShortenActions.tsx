import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { IShortenAnalytics, IShortenInfo } from '../types/shorten';
import { getShortenInfo, getShortenAnalytics, deleteShorten } from '../api/requests';

export const ShortenActions = () => {
    const [shortUrl, setShortUrl] = useState('');
    const [shortenInfo, setShortenInfo] = useState<IShortenInfo | null>(null);
    const [stats, setStats] = useState<IShortenAnalytics | null>(null);
    const [error, setError] = useState('');

    const handleGetInfo = async () => {
        try {
            const data = await getShortenInfo(shortUrl);
            setShortenInfo(data);
            setStats(null);
            setError('');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Неизвестная ошибка')
            setShortenInfo(null);
        }
    };

    const handleGetStats = async () => {
        try {
            const data = await getShortenAnalytics(shortUrl);
            setShortenInfo(null);
            setStats(data);
            setError('');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Неизвестная ошибка')
        }
    };

    const handleDelete = async () => {
        try {
            await deleteShorten(shortUrl);
            setError('Ссылка удалена');
            setShortenInfo(null);
            setStats(null);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Неизвестная ошибка')
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <h2 style={{ textAlign: 'center' }}>Просмотр и удаление ссылок</h2>
        <TextField
            label="Короткий код ссылки"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button variant="contained" onClick={handleGetInfo}>
            Инфо
            </Button>
            <Button variant="outlined" onClick={handleGetStats}>
            Статистика
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
            Удалить
            </Button>
        </Box>

        {error && (
            <Typography color="error" sx={{ mb: 2 }}>
                {error}
            </Typography>
        )}

        {shortenInfo && (
            <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Информация о ссылке</Typography>
            <Typography>
                Оригинальная: <a href={shortenInfo.originalUrl} target="_blank" rel="noopener noreferrer">
                {shortenInfo.originalUrl}
                </a>
            </Typography>
            <Typography>Дата создания: {new Date(shortenInfo.createdAt).toLocaleString('ru')}</Typography>
            <Typography>Кликов: {shortenInfo.clickCount}</Typography>
            </Paper>
        )}

        {stats && (
            <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Статистика</Typography>
            <Typography>Кликов: {stats.clickCount}</Typography>
            <Typography>Последние IP: {stats.lastClicksIps.join(', ')}</Typography>
            </Paper>
        )}
        </Box>
    );
};
