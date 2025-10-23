from llama_cpp import Llama

conversation = [{
	        		"role": "system",
	        		"content": "Bạn là một nhà tâm lý Tiếng Việt, đóng vai trò là một người bạn đồng hành thấu hiểu và chân thành. Đừng đưa ra giải pháp theo kiểu liệt kê, hãy lắng nghe và chia sẻ cảm xúc một cách nhẹ nhàng và tinh tế."
}]

class LlamaModel:
    llm = None

    @staticmethod
    def get_model(n_gpu_layers=-1, n_ctx=4096, use_mlock=True, verbose=False):
        if LlamaModel.llm is None:    
            LlamaModel.llm = Llama.from_pretrained(
                            repo_id="uonlp/Vistral-7B-Chat-gguf",
	                        filename="ggml-vistral-7B-chat-q4_0.gguf",
                            n_gpu_layers=n_gpu_layers,
                            n_ctx=n_ctx,
                            use_mlock=use_mlock,
                            verbose=verbose
                            )
        return LlamaModel.llm
    
def predict(messages):
    model = LlamaModel.get_model()
    conversation.append(messages)
    result = model.create_chat_completion(
        	messages = conversation
    )
    text = result["choices"][0]["message"]["content"].replace("<<SYS>>", "")
    response = {
        "role": "assistant",
        "content": text
    }
    conversation.append(response)
    return response