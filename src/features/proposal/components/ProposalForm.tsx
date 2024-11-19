import { useState, useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTags,
  fetchLocations,
  fetchProposalDetail,
  submitProposal,
  updateProposal,
} from '@/features/proposal/slice/proposalSlice';
import dayjs from 'dayjs';
import { AppDispatch, RootState } from '@/api/store/store';
import { tagService } from '@/features/tag/tagServices';
import { locationService } from '@/features/location/locationServices';

interface ProposalFormProps {
  proposalId?: number;
  mode: 'create' | 'update';
}

const ProposalForm = ({ proposalId, mode }: ProposalFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [quillReady, setQuillReady] = useState(false);
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);
  const [location, setLocation] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [participation, setParticipation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<any>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { availableTags, availableLocations, currentProposal, loading, error } =
    useSelector((state: RootState) => state.proposal);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    const initQuill = async () => {
      if (
        typeof window !== 'undefined' &&
        quillRef.current &&
        !quillInstanceRef.current
      ) {
        const Quill = (await import('quill')).default;
        quillInstanceRef.current = new Quill(quillRef.current, {
          theme: 'snow',
          placeholder: '輸入文章內容...',
        });

        quillInstanceRef.current.on('text-change', () => {
          setContent(quillInstanceRef.current.root.innerHTML);
        });

        setQuillReady(true); // Quill is now ready
      }
    };

    initQuill();

    return () => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current.off('text-change');
        quillInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mode === 'update' && proposalId) {
      dispatch(fetchProposalDetail(proposalId));
    }
  }, [dispatch, proposalId]);

  useEffect(() => {
    if (
      mode === 'update' &&
      quillReady &&
      quillInstanceRef.current &&
      currentProposal
    ) {
      setTitle(currentProposal.title);
      setContent(currentProposal.content);
      setTags(
        currentProposal.tags.map((tag: any) => ({
          value: tag.tag_id.toString(),
          label: tag.tag_name,
        }))
      );
      setLocation({
        value: currentProposal.location_id.toString(),
        label: currentProposal.location_name,
      });
      setStartDate(
        dayjs(currentProposal.start_date, 'YYYY/MM/DD HH:mm:ss').format(
          'YYYY-MM-DDTHH:mm'
        )
      );
      setEndDate(
        dayjs(currentProposal.end_date, 'YYYY/MM/DD HH:mm:ss').format(
          'YYYY-MM-DDTHH:mm'
        )
      );
      setParticipation(currentProposal.people_required.toString());
      quillInstanceRef.current.root.innerHTML = currentProposal.content;
    }
  }, [quillReady, currentProposal]);

  const handleSubmit = async (e: React.FormEvent, status: string) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    tags.forEach((tag, index) => {
      formData.append(`tag_ids[${index}]`, tag.value);
    });
    if (location) {
      formData.append('location_id', location.value);
    }
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('status', status);

    if (image) {
      formData.append('image', image);
    }
    formData.append('people_required', participation);

    try {
      if (mode === 'update' && proposalId) {
        await dispatch(
          updateProposal({ proposal_id: proposalId, formData })
        ).unwrap();
      } else {
        await dispatch(submitProposal(formData)).unwrap();
      }

      router.push('/proposal');
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleTagChange = (selectedTags: any) => {
    setTags(selectedTags);
  };

  const handleLocationChange = (selectedLocation: any) => {
    setLocation(selectedLocation as { label: string; value: string });
  };

  const handleCreateTag = async (inputValue: string) => {
    try {
      const response = await tagService.submitTag(inputValue);
      const newTag = { label: response.name, value: response.id.toString() };
      // setAvailableTags((prevTags) => [...prevTags, newTag]);
      setTags((prevTags) => [...prevTags, newTag]);
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  const handleCreateLocation = async (inputValue: string) => {
    try {
      const response = await locationService.submitLocation(inputValue);
      const newLocation = {
        label: response.name,
        value: response.id.toString(),
      };
      // setAvailableLocations((prevLocations) => [...prevLocations, newLocation]);
      setLocation(newLocation);
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  return (
    <div className="col-span-12 md:col-span-9 bg-white rounded-lg shadow-lg py-10 px-10">
      <form onSubmit={(e) => handleSubmit(e, 'published')}>
        {/* 標題 */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            標題
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入提案標題"
            required
          />
        </div>

        {/* 內容編輯器 */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 font-semibold mb-2 h-100"
          >
            內容
          </label>
          <div
            ref={quillRef}
            className="h-64 mb-4 border rounded-md quill-editor"
            style={{ minHeight: '300px' }}
          />
        </div>

        {/* 圖片上傳 */}
        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-gray-700 font-semibold mb-2"
          >
            圖片上傳
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          {image && (
            <p className="text-gray-600 mt-2">已選擇檔案: {image.name}</p>
          )}
        </div>

        {/* 標籤和地點 */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="participation"
              className="block text-gray-700 font-semibold mb-2"
            >
              標籤
            </label>
            <CreatableSelect
              isMulti
              value={tags}
              onChange={handleTagChange}
              options={availableTags}
              onCreateOption={handleCreateTag}
              placeholder="選擇或創建標籤..."
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-semibold mb-2"
            >
              地點
            </label>
            <CreatableSelect
              value={location}
              onChange={handleLocationChange}
              options={availableLocations}
              onCreateOption={handleCreateLocation}
              placeholder="選擇或創建地點..."
            />
          </div>
        </div>

        {/* 募集人數 */}
        <div className="mb-6">
          <label
            htmlFor="participation"
            className="block text-gray-700 font-semibold mb-2"
          >
            募集人數
          </label>
          <input
            id="participation"
            type="number"
            value={participation}
            onChange={(e) => setParticipation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入募集人數"
            required
          />
        </div>

        {/* 開始日期和結束日期 */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-gray-700 font-semibold mb-2"
            >
              開始日期
            </label>
            <input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-gray-700 font-semibold mb-2"
            >
              結束日期
            </label>
            <input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* 按鈕：發表或儲存為草稿 */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e as any, 'draft')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? '儲存中...' : '儲存草稿'}
          </button>
          {proposalId ? (
            <button
              type="button"
              onClick={(e) => handleSubmit(e as any, 'published')}
              className="btn"
              disabled={loading}
            >
              {loading ? '更新中...' : '更新提案'}
            </button>
          ) : (
            <button type="submit" className="btn" disabled={loading}>
              {loading ? '發表中...' : '發表提案'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProposalForm;
