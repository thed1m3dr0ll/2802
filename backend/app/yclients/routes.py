from fastapi import APIRouter, HTTPException
from .schemas import BookingRequest, BookingResult
from .client import create_record_and_get_user_id


router = APIRouter(prefix="/yclients", tags=["yclients"])


@router.post("/booking", response_model=BookingResult)
async def booking(req: BookingRequest):
    try:
        record_id, user_id = await create_record_and_get_user_id(
            name=req.name,
            phone=req.phone,
            email=req.email,
            service_id=req.serviceId,
            staff_id=req.staffId,
            datetime=req.datetime,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    return BookingResult(
        success=True,
        recordId=record_id,
        userId=user_id,
    )
