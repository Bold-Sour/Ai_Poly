import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

interface AnalysisResult {
  pythonResult: any;
  rResult: any;
  juliaResult: any;
  rustResult: any;
}

const Home: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call Python service
      const pythonResponse = await axios.post('http://localhost:8080/ai/analyze', {
        text: input,
        modelId: 'python-bert'
      });

      // Call R service
      const rResponse = await axios.post('http://localhost:8081/analyze', {
        data: pythonResponse.data.numerical_features
      });

      // Call Julia service
      const juliaResponse = await axios.post('http://localhost:8082/optimize', {
        data: rResponse.data.basic_statistics
      });

      // Call Rust service
      const rustResponse = await axios.post('http://localhost:8083/optimize', {
        data: juliaResponse.data.solution,
        dimensions: 1,
        batch_size: 100
      });

      setResults({
        pythonResult: pythonResponse.data,
        rResult: rResponse.data,
        juliaResult: juliaResponse.data,
        rustResult: rustResponse.data
      });
    } catch (err) {
      setError('An error occurred during analysis');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          AI Polyglot System
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            label="Enter text for analysis"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAnalysis}
            disabled={loading || !input}
          >
            {loading ? <CircularProgress size={24} /> : 'Analyze'}
          </Button>
        </Paper>

        {error && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.light' }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        )}

        {results && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Python Analysis</Typography>
                <pre>{JSON.stringify(results.pythonResult, null, 2)}</pre>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">R Statistical Analysis</Typography>
                <pre>{JSON.stringify(results.rResult, null, 2)}</pre>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Julia Optimization</Typography>
                <pre>{JSON.stringify(results.juliaResult, null, 2)}</pre>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Rust System Optimization</Typography>
                <pre>{JSON.stringify(results.rustResult, null, 2)}</pre>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Home; 