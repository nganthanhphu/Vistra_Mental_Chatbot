<div align="center">

<img src="logo.png" style="width:120px">

# Vistra Mental Chatbot

A mental health counseling chatbot that acts as an understanding companion, helping users share their feelings and be heard.

<div align="center">
<p>
    <img src="https://img.shields.io/badge/Python-3.8+-blue.svg" alt="Python 3.8+">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
    <img src="https://img.shields.io/github/stars/nganthanhphu/Vistra_Mental_Chatbot?style=social" alt="GitHub Stars">
</p>
</div>
</div>

## About

**Vistra Mental Chatbot** is an AI-powered mental health support application designed specifically for Vietnamese users. Built on the **Vistral-7B-Chat** language model, this chatbot provides empathetic, thoughtful conversations to support users' mental wellbeing.

### Key Features

- **Intelligent AI Chat**: Powered by Vistral-7B-Chat, optimized for Vietnamese language
- **Psychology-Focused**: Trained with prompts to act as a professional mental health counselor
- **Voice Input Support**: Speech recognition for hands-free chatting
- **Dark/Light Theme**: Toggle between dark and light modes for comfortable viewing
- **User-Friendly Web Interface**: Simple and easy-to-use UI/UX
- **Privacy-First**: Runs locally on your machine - your conversations stay private

## Disclaimer

This chatbot is an AI assistant for emotional support and should **NOT** replace professional mental health services.

Always consult qualified mental health professionals for serious mental health concerns.

## System Requirements

### For API Backend
- **Python**: 3.8 or higher
- **CPU**: AVX2 instruction set support
- **RAM**: 16GB minimum (recommended for optimal performance)
- **GPU**: CUDA-compatible GPU with at least 4GB VRAM (optional, for faster inference)
- **Disk Space**: ~5GB for model and dependencies

### For Chatbot Web UI
- **Python**: 3.8 or higher
- **Web Browser**: Modern browser with JavaScript support

## System Architecture

The project consists of 2 main components:

### 1. API Backend
- **Flask REST API** handles AI model inference
- `/predict` endpoint receives messages and returns responses

### 2. Web Frontend
- **Flask web server** serves the user interface
- Responsive HTML/CSS/JavaScript chat interface
- Real-time message rendering


## Installation

### Prerequisites

Make sure you have Python 3.8+ installed on your system. You can verify by running:

```bash
python --version
```

### Step 1: Clone the Repository

```bash
git clone https://github.com/nganthanhphu/Vistra_Mental_Chatbot.git
cd Vistra_Mental_Chatbot
```

**Note**: You should run this project in Python virtual environment

---

### A: Setting Up the API Backend

#### 1. Navigate to API directory

```bash
cd api
```

#### 2. Install dependencies

```bash
pip install -r requirements.txt
```


#### 3. Test the API Backend

Start the API server:

```bash
python app.py
```

**Note**: On first run, the model will automatically download from HuggingFace.

---

### B: Setting Up the Web UI

#### 1. Navigate to chatbot app directory

```bash
cd chatbotapp
```

#### 2. Install dependencies

```bash
pip install -r requirements.txt
```

#### 3. Test the Web UI

Start the web server:

```bash
python index.py
```

## Configuration

### Model Parameters

You can customize the model behavior by adjusting these parameters:
- **`n_gpu_layers`**: Number of layers running on the GPU.
  - **Note**: The higher the number, the higher the performance, the more GPU VRAM is used.
  
- **`n_ctx`**: Context window size (conversation history length)
  - **Note**: Higher values mean slower inference and more RAM usage

- **`use_mlock`**: Lock model in RAM, prevents swapping to disk

- **`verbose`**: Enable debug logging

### API Endpoint Configuration

To change the API endpoint URL, edit the `CONFIG.API_URL` in `chatbotapp/static/script.js`:

```javascript
const CONFIG = {
    API_URL: 'http://127.0.0.1:5000/predict',
    // ...
};
```

### System Prompt Customization

To modify the chatbot's personality and behavior, edit the system prompt in `api/model.py`:

```python
conversation = [{
    "role": "system",
    "content": "Your custom system prompt here..."
}]
```

## API Documentation

### Endpoint: `POST /predict`

Send a user message and receive the chatbot's response.

**Default base URL:** `http://127.0.0.1:5000`

**Request Format:**
```json
{
  "role": "user",
  "content": "Hôm nay tôi cảm thấy rất mệt mỏi..."
}
```

**Response Format:**
```json
{
  "role": "bot",
  "content": "Tôi hiểu rằng bạn đang cảm thấy mệt mỏi. Bạn có thể chia sẻ thêm về những gì đang khiến bạn cảm thấy như vậy không?"
}
```

## Acknowledgments

This project wouldn't be possible without these amazing projects:

- **[Vistral-7B-Chat](https://huggingface.co/uonlp/Vistral-7B-Chat-gguf)** - multi-turn conversational large language model for Vietnamese
- **[llama-cpp-python](https://github.com/abetlen/llama-cpp-python)** - Python bindings for llama.cpp by Andrei Betlen
- **[Flask](https://flask.palletsprojects.com/)** - Lightweight web framework for Python
- **[HuggingFace](https://huggingface.co/)** - Model hosting and distribution platform

## Support

If you encounter any issues or have questions:

1. Search existing [Issues](https://github.com/nganthanhphu/Vistra_Mental_Chatbot/issues) to see if your problem has been addressed
2. Open a new Issue

## Contributors

<div align="center">

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/wuanhi">
        <img src="https://github.com/wuanhi.png" width="100px;" alt="Trần Quang Huy"/>
        <br />
        <sub><b>Trần Quang Huy</b></sub>
      </a>
      <br />
    </td>
    <td align="center">
      <a href="https://github.com/PhanDo25092005">
        <img src="https://github.com/PhanDo25092005.png" width="100px;" alt="Trần Quang Huy"/>
        <br />
        <sub><b>Phan Nhật Đô</b></sub>
      </a>
      <br />
    </td>
  </tr>
</table>

</div>

## License

This project is licensed under the MIT License.