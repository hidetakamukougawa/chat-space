json.(@message, :content, :image)
json.created_at @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.user_name @message.user.name
json.id @message.id

json.group_id @message.group.id
