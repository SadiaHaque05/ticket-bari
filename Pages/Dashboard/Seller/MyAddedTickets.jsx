import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import ErrorPage from '../../ErrorPage';

const MyAddedTickets = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: tickets, isLoading, isError } = useQuery({
    queryKey: ['myTickets', user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets?vendorEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, 
  });

  const deleteMutation = useMutation({
    mutationFn: async (ticketId) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tickets/${ticketId}`);
    },
    onSuccess: () => {
      toast.success('Ticket deleted successfully');
      queryClient.invalidateQueries(['myTickets', user?.email]);
    },
    onError: (err) => toast.error(err.message || 'Delete failed'),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">My Added Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500">You have not added any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map(ticket => (
            <div key={ticket._id} className="bg-white rounded-md shadow p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">{ticket.title}</h3>
                <p className="text-sm text-gray-600">
                  From: {ticket.from} | To: {ticket.to}
                </p>
                <p className="text-sm text-gray-600">Transport: {ticket.transportType}</p>
                <p className="text-sm text-gray-600">Price: ${ticket.price}</p>
                <p className="text-sm text-gray-600">Quantity: {ticket.quantity}</p>
                <p className="text-sm text-gray-600">Departure: {new Date(ticket.departure).toLocaleString()}</p>
                {ticket.perks && ticket.perks.length > 0 && (
                  <p className="text-sm text-gray-600">Perks: {ticket.perks.join(', ')}</p>
                )}
                <p className={`text-sm font-semibold mt-2 ${
                  ticket.verificationStatus === 'approved'
                    ? 'text-green-600'
                    : ticket.verificationStatus === 'rejected'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}>
                  Status: {ticket.verificationStatus}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  disabled={ticket.verificationStatus === 'rejected'}
                  onClick={() => navigate(`/update-ticket/${ticket.id}`)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded bg-lime-500 text-white hover:bg-lime-600 disabled:bg-gray-300 disabled:text-gray-600`}
                >
                  <TbEdit /> Update
                </button>
                <button
                  disabled={ticket.verificationStatus === 'rejected'}
                  onClick={() => deleteMutation.mutate(ticket.id)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-600`}
                >
                  <TbTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
