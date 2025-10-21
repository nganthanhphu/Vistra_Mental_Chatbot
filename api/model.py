from llama_cpp import Llama

class LlamaModel:
    llm = None

    @staticmethod
    def get_model():
        if LlamaModel.llm is None:    
            LlamaModel.llm = Llama.from_pretrained(
                            repo_id="uonlp/Vistral-7B-Chat-gguf",
	                        filename="ggml-vistral-7B-chat-q4_0.gguf"
                            )
        return LlamaModel.llm
    
def predict(messages):
    model = LlamaModel.get_model()
    result = model.create_chat_completion(
        	messages = messages
    )
    response = result["choices"][0]["message"]
    return response