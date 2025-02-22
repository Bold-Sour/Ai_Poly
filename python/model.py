import numpy as np
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel
from sklearn.preprocessing import StandardScaler
from typing import List, Dict, Any

class MultiModalAIModel:
    def __init__(self):
        self.text_tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
        self.text_model = AutoModel.from_pretrained("bert-base-uncased")
        self.scaler = StandardScaler()
        self.neural_network = self._create_neural_network()

    def _create_neural_network(self) -> nn.Module:
        return nn.Sequential(
            nn.Linear(768, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Linear(256, 128)
        )

    def process_text(self, text: str) -> torch.Tensor:
        inputs = self.text_tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            outputs = self.text_model(**inputs)
        return outputs.last_hidden_state.mean(dim=1)

    def process_numerical_data(self, data: np.ndarray) -> np.ndarray:
        return self.scaler.fit_transform(data)

    def forward(self, text: str, numerical_data: np.ndarray) -> Dict[str, Any]:
        text_features = self.process_text(text)
        numerical_features = torch.FloatTensor(self.process_numerical_data(numerical_data))
        
        combined_features = torch.cat([text_features, numerical_features], dim=1)
        output = self.neural_network(combined_features)
        
        return {
            "embeddings": output.numpy(),
            "text_features": text_features.numpy(),
            "numerical_features": numerical_features.numpy()
        }

    def save_model(self, path: str):
        torch.save({
            'neural_network_state': self.neural_network.state_dict(),
            'scaler_state': self.scaler
        }, path)

    def load_model(self, path: str):
        checkpoint = torch.load(path)
        self.neural_network.load_state_dict(checkpoint['neural_network_state'])
        self.scaler = checkpoint['scaler_state'] 