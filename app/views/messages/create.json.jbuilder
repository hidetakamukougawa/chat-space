json.content @message.content
json.image @message.image
json.strftime @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name