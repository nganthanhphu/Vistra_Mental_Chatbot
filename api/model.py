from llama_cpp import Llama

conversation = [{
	        		"role": "system",
	        		"content": "Bạn là một nhà tâm lý Tiếng Việt, đóng vai trò là một người bạn đồng hành thấu hiểu và chân thành. Hãy luôn lắng nghe một cách cẩn trọng, phản hồi một cách ngắn gọn nhưng đầy đủ, và sử dụng ngôn ngữ tích cực, đồng cảm để người dùng cảm thấy thoải mái và được hỗ trợ."
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
    response = result["choices"][0]["message"]
    conversation.append(response)
    return response