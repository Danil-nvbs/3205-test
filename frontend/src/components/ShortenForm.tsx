import { useState, FormEvent } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { createShortLink } from "../api/requests";
import { IShorten } from "../types/shorten";

export const ShortenForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const [newShorten, setNewShorten] = useState<IShorten | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let expiresAtISO: string | undefined = undefined;
    if (expiresAt) {
      const localDate = new Date(expiresAt);
      expiresAtISO = localDate.toISOString();
    }
    try {
        const newShorten = await createShortLink({
            originalUrl,
            alias: alias || undefined,
            expiresAt: expiresAtISO,
          });
      
          setNewShorten(newShorten)
          setOriginalUrl("");
          setAlias("");
          setExpiresAt("");
          setError("");
    } catch (err: any) {
        setNewShorten(null)
        setError(err?.response?.data?.message?.join('; ')|| 'Неизвестная ошибка');
    };
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, gap: 2, mx: 'auto', p: 3 }}>
        <h2 style={{ textAlign: 'center' }}>Создание ссылки</h2>
        <TextField
            label="Полная ссылка"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
        />
        <TextField
            label="Алиас (необязательно)"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
        />
        <TextField
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            helperText="Если не указано — ссылка бессрочная"
        />
        <Button type="submit" variant="contained" color="primary">
            Создать короткую ссылку
        </Button>

        {error && (
            <Typography color="error" sx={{ mb: 2 }}>
            {error}
            </Typography>
        )}

        {newShorten && (
            <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Ссылка создана!</Typography>
            <Typography>
                <a href={`http://${window.location.hostname}:3001/${newShorten.shortUrl}`} target="_blank" rel="noopener noreferrer">
                {`http://${window.location.hostname}:3001/${newShorten.shortUrl}`}
                </a>
            </Typography>
            </Paper>
        )}
    </Box>
  );
};